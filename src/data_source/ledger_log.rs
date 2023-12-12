// Copyright (c) 2022 Espresso Systems (espressosys.com)
// This file is part of the HotShot Query Service library.
//
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU
// General Public License as published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
// even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program. If not,
// see <https://www.gnu.org/licenses/>.

#![cfg(feature = "file-system-data-source")]

use async_compatibility_layer::async_primitives::broadcast::{channel, BroadcastSender};
use atomic_store::{
    append_log, load_store::BincodeLoadStore, AppendLog, AtomicStoreLoader, PersistenceError,
};
use futures::stream::{self, BoxStream, StreamExt};
use serde::{de::DeserializeOwned, Serialize};
use std::collections::VecDeque;
use std::fmt::Debug;
use tracing::warn;

/// A caching append log for ledger objects.
#[derive(Debug)]
pub(crate) struct LedgerLog<T: Serialize + DeserializeOwned> {
    cache_start: usize,
    cache_size: usize,
    cache: VecDeque<Option<T>>,
    store: AppendLog<BincodeLoadStore<Option<T>>>,
    // Keep track of the number of appended objects which have not yet been committed. We need this
    // to detect when we are inserting at the end of the log or in the middle, as the two casese are
    // handled differently and `self.store.iter().len()` does not update until a new version is
    // committed.
    pending_inserts: usize,

    // Send handle for a channel where we stream resource.
    stream: BroadcastSender<T>,
    // Because we may receive resource out of order, but `stream` must be ordered, we will not
    // necessarily send a resource as soon as we get it. `stream_pos` is the index in `store` of the
    // next object to be sent on `stream` when we receive it. It is equal to the length of the
    // longest prefix of non-[None] objects in `store`, which may be less than the total length of
    // `store`.
    stream_pos: usize,
}

impl<T: Serialize + DeserializeOwned + Clone> LedgerLog<T> {
    pub(crate) fn create(
        loader: &mut AtomicStoreLoader,
        file_pattern: &str,
        cache_size: usize,
    ) -> Result<Self, PersistenceError> {
        Ok(Self {
            cache_start: 0,
            cache_size,
            cache: VecDeque::with_capacity(cache_size),
            store: AppendLog::create(
                loader,
                Default::default(),
                file_pattern,
                1u64 << 20, // 1 MB
            )?,
            pending_inserts: 0,
            stream: channel().0,
            stream_pos: 0,
        })
    }

    pub(crate) fn open(
        loader: &mut AtomicStoreLoader,
        file_pattern: &str,
        cache_size: usize,
    ) -> Result<Self, PersistenceError> {
        let store = AppendLog::load(
            loader,
            Default::default(),
            file_pattern,
            1u64 << 20, // 1 MB
        )?;
        let len = store.iter().len();
        tracing::info!("loading LedgerLog {}, len={}", file_pattern, len);

        let cache_start = if len > cache_size {
            len - cache_size
        } else {
            // If the cache is large enough to contain every object in storage, we start it at index
            // 0 so that it does.
            0
        };
        let mut cache = store
            .iter()
            .skip(cache_start)
            .map(|r| {
                if let Err(e) = &r {
                    warn!("failed to load object. Error: {}", e);
                }
                // We treat missing objects and failed-to-load objects the same:
                // if we failed to load a object, it is now missing!
                r.ok().flatten()
            })
            .collect::<VecDeque<_>>();
        cache.reserve_exact(cache_size - cache.len());

        // Find the next object to broadcast on `stream` when it becomes available. This is the
        // index of the first _unavailable_ item in `store`.
        let stream_pos = store
            .iter()
            .position(|entry| !matches!(entry, Ok(Some(_))))
            // If there are no currently unavailable entries in `store`, then the next object to
            // broadcast is the next object to be appended to `store`, whose index is the length of
            // `store`.
            .unwrap_or_else(|| store.iter().len());
        tracing::debug!("stream_pos={}", stream_pos);

        Ok(Self {
            cache_start,
            cache_size,
            cache,
            store,
            pending_inserts: 0,
            stream: channel().0,
            stream_pos,
        })
    }

    pub(crate) fn iter(&self) -> Iter<T> {
        Iter {
            index: 0,
            cache_start: self.cache_start,
            cache: &self.cache,
            store: self.store.iter(),
        }
    }

    pub(crate) fn store_resource(&mut self, resource: Option<T>) -> Result<(), PersistenceError> {
        self.store.store_resource(&resource)?;
        self.pending_inserts += 1;
        if self.cache.len() >= self.cache_size {
            self.cache.pop_front();
            self.cache_start += 1;
        }
        self.cache.push_back(resource);
        Ok(())
    }

    pub(crate) fn insert(&mut self, index: usize, object: T) -> Result<(), PersistenceError>
    where
        T: Debug,
    {
        // If there are missing objects between what we currently have and `object`, pad with
        // placeholders.
        let len = self.store.iter().len() + self.pending_inserts;
        let target_len = std::cmp::max(index, len);
        for i in len..target_len {
            tracing::debug!("storing placeholders for position {}/{target_len}", len + i);
            if let Err(err) = self.store_resource(None) {
                warn!("Failed to store placeholder: {}", err);
                return Err(err);
            }
        }
        assert!(target_len >= index);
        if target_len == index {
            // This is the next object in the chain, append it to the log.
            if let Err(err) = self.store_resource(Some(object)) {
                warn!("Failed to store object at index {}: {}", index, err);
                return Err(err);
            }
        } else {
            // This is an object earlier in the chain that we are now receiving asynchronously.
            // Update the placeholder with the actual contents of the object.
            // TODO update persistent storage once AppendLog supports updates.
            warn!("skipping out-of-order object; random inserts not yet supported");

            // Update the object in cache if necessary.
            if index >= self.cache_start {
                self.cache[index - self.cache_start] = Some(object);
            }
        }
        Ok(())
    }

    pub(crate) async fn commit_version(&mut self) -> Result<(), PersistenceError> {
        tracing::debug!("committing new version of LedgerLog");
        self.store.commit_version()?;
        self.pending_inserts = 0;

        // Broadcast any newly-appended objects which extend the in-order available prefix.
        let mut i = self.stream_pos;
        let mut objects = self.iter().skip(i);
        while let Some(Some(obj)) = objects.next() {
            tracing::debug!("broadcasting new object {}", i);
            // Ignore errors on sending, it just means all listeners have dropped their handles.
            self.stream.send_async(obj).await.ok();
            i += 1;
        }
        self.stream_pos = i;

        Ok(())
    }

    pub(crate) fn skip_version(&mut self) -> Result<(), PersistenceError> {
        self.store.skip_version()
    }

    pub(crate) fn revert_version(&mut self) -> Result<(), PersistenceError> {
        self.store.revert_version()?;

        // Remove objects which were inserted in cache but not committed to storage.
        for _ in 0..self.pending_inserts {
            self.cache.pop_back();
        }

        self.pending_inserts = 0;
        Ok(())
    }
}

impl<T: Serialize + DeserializeOwned + Clone + Send + 'static> LedgerLog<T> {
    pub(crate) fn subscribe(&self, from: usize) -> Option<BoxStream<'static, T>> {
        tracing::debug!(
            "subcribing to objects from {}, stream_pos={}, len={}",
            from,
            self.stream_pos,
            self.iter().len()
        );

        // A prefix of items are already available, from `from` to `self.stream_pos`. We can yield
        // these immediately.
        let prefix = self
            .iter()
            .skip(from)
            // `saturating_sub` handles the case where `from >= self.stream_pos`, in which case
            // `prefix` is empty.
            .take(self.stream_pos.saturating_sub(from))
            .collect::<Option<Vec<_>>>()?;
        // After the prefix comes the asynchronous stream of items yielded by `self.stream`. Convert
        // the receive handle for `self.stream` into an instance of `Stream`.
        let stream = stream::unfold(self.stream.handle_sync(), |mut handle| async move {
            match handle.recv_async().await {
                Ok(obj) => Some((obj, handle)),
                Err(_) => {
                    // An error in receive means the send end of the channel has been disconnected,
                    // which means the stream is over.
                    None
                }
            }
        });
        // Filter the asynchronous stream so that it starts at `self.stream_pos` or `from`,
        // whichever comes later.
        let rest = stream.skip(from.saturating_sub(self.stream_pos));
        // Return the concatenation of these two streams.
        Some(stream::iter(prefix).chain(rest).boxed())
    }
}

pub struct Iter<'a, T: Serialize + DeserializeOwned> {
    index: usize,
    cache_start: usize,
    cache: &'a VecDeque<Option<T>>,
    store: append_log::Iter<'a, BincodeLoadStore<Option<T>>>,
}

impl<'a, T: Serialize + DeserializeOwned + Clone> Iterator for Iter<'a, T> {
    type Item = Option<T>;

    fn next(&mut self) -> Option<Self::Item> {
        // False positive: clippy suggests `self.next()` instead of `self.nth(0)`, but that would be
        // recursive.
        #[allow(clippy::iter_nth_zero)]
        self.nth(0)
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        // Include objects in cache that haven't necessarily been committed to storage yet. This is
        // consistent with `nth`, which will yield such objects.
        let len = (self.cache_start + self.cache.len()).saturating_sub(self.index);
        (len, Some(len))
    }

    fn nth(&mut self, n: usize) -> Option<Self::Item> {
        self.index += n;
        let res = if self.index >= self.cache_start {
            // Get the object from cache if we can.
            self.cache.get(self.index - self.cache_start).cloned()
        } else {
            // Otherwise load from storage.
            self.store.nth(n).map(|res| {
                if let Err(e) = &res {
                    warn!("failed to load object at position {}: error {}", n, e);
                }
                // Both a failed load and a successful load of `None` are treated the same: as
                // missing data, so we yield `None`. The latter case can happen if there was a
                // previous failed load and we marked this entry as explicitly missing.
                res.ok().flatten()
            })
        };

        self.index += 1;
        res
    }

    fn count(self) -> usize {
        self.size_hint().0
    }
}

impl<'a, T: Serialize + DeserializeOwned + Clone> ExactSizeIterator for Iter<'a, T> {}

#[cfg(test)]
mod test {
    use super::*;
    use crate::testing::setup_test;
    use atomic_store::AtomicStore;
    use tempdir::TempDir;

    #[async_std::test]
    async fn test_ledger_log_creation() {
        setup_test();

        let dir = TempDir::new("test_ledger_log").unwrap();

        // Create and populuate a log.
        {
            let mut loader = AtomicStoreLoader::create(dir.path(), "test_ledger_log").unwrap();
            let mut log = LedgerLog::<u64>::create(&mut loader, "ledger", 3).unwrap();
            let mut store = AtomicStore::open(loader).unwrap();
            for i in 0..5 {
                log.store_resource(Some(i)).unwrap();
                log.commit_version().await.unwrap();
                store.commit_version().unwrap();
            }
        }

        // Load the log from storage and check that we get the correct contents.
        {
            let mut loader = AtomicStoreLoader::load(dir.path(), "test_ledger_log").unwrap();
            let log = LedgerLog::<u64>::open(&mut loader, "ledger", 3).unwrap();
            AtomicStore::open(loader).unwrap();
            assert_eq!(
                log.iter().collect::<Vec<_>>(),
                (0..5).map(Some).collect::<Vec<_>>()
            );
        }
    }

    #[async_std::test]
    async fn test_ledger_log_insert() {
        setup_test();

        let dir = TempDir::new("test_ledger_log").unwrap();
        let mut loader = AtomicStoreLoader::create(dir.path(), "test_ledger_log").unwrap();
        let mut log = LedgerLog::<u64>::create(&mut loader, "ledger", 3).unwrap();
        let mut store = AtomicStore::open(loader).unwrap();
        assert_eq!(log.iter().collect::<Vec<_>>(), vec![]);

        // Insert at end.
        log.insert(0, 1).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        assert_eq!(log.iter().collect::<Vec<_>>(), vec![Some(1)]);

        // Insert past end.
        log.insert(4, 2).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        assert_eq!(
            log.iter().collect::<Vec<_>>(),
            vec![Some(1), None, None, None, Some(2)]
        );

        // Insert in middle (in cache).
        log.insert(2, 3).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        assert_eq!(
            log.iter().collect::<Vec<_>>(),
            vec![Some(1), None, Some(3), None, Some(2)]
        );

        // Insert in middle (out of cache).
        log.insert(1, 4).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        // TODO check results once AppendLog supports random access updates.
    }

    #[async_std::test]
    async fn test_ledger_log_iter() {
        setup_test();

        let dir = TempDir::new("test_ledger_log").unwrap();
        let mut loader = AtomicStoreLoader::create(dir.path(), "test_ledger_log").unwrap();
        let mut log = LedgerLog::<u64>::create(&mut loader, "ledger", 3).unwrap();
        let mut store = AtomicStore::open(loader).unwrap();
        for i in 0..5 {
            log.store_resource(Some(i)).unwrap();
            log.commit_version().await.unwrap();
            store.commit_version().unwrap();
        }

        assert_eq!(log.iter().len(), 5);
        for i in 0..5 {
            let mut iter = log.iter();
            assert_eq!(iter.nth(i as usize).unwrap(), Some(i), "{:?}", log);

            // `nth` should not only have returned the `n`th element, but also advanced the iterator.
            assert_eq!(
                iter.collect::<Vec<_>>(),
                (i + 1..5).map(Some).collect::<Vec<_>>()
            );
        }
        assert_eq!(log.iter().nth(5), None);
    }

    #[async_std::test]
    async fn test_ledger_log_subscribe() {
        setup_test();

        let dir = TempDir::new("test_ledger_log").unwrap();
        let mut loader = AtomicStoreLoader::create(dir.path(), "test_ledger_log").unwrap();
        let mut log = LedgerLog::<u64>::create(&mut loader, "ledger", 3).unwrap();
        let mut store = AtomicStore::open(loader).unwrap();

        log.store_resource(Some(0)).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();

        // Subscribe one stream starting from items that already exist and one stream starting from
        // the future.
        let mut past = log.subscribe(0).unwrap();
        let mut future = log.subscribe(1).unwrap();
        assert_eq!(past.next().await.unwrap(), 0);

        // Store a new item, it should be reflected in both streams.
        log.store_resource(Some(1)).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        assert_eq!(past.next().await.unwrap(), 1);
        assert_eq!(future.next().await.unwrap(), 1);

        // Store two items out of order, they should be reflected in the streams in order.
        log.insert(3, 3).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        log.insert(2, 2).unwrap();
        log.commit_version().await.unwrap();
        store.commit_version().unwrap();
        assert_eq!(past.next().await.unwrap(), 2);
        assert_eq!(future.next().await.unwrap(), 2);
        assert_eq!(past.next().await.unwrap(), 3);
        assert_eq!(future.next().await.unwrap(), 3);

        // TODO enable out-of-order reloading tests once AppendLog supports out-of-order insertion
        // https://github.com/EspressoSystems/hotshot-query-service/issues/16
        // Store another item out of order, then reload the log from disk.
        // log.insert(5, 5).unwrap();
        // log.commit_version().await.unwrap();
        // store.commit_version().unwrap();
        // drop(log);
        // drop(store);
        // let mut loader = AtomicStoreLoader::load(dir.path(), "test_ledger_log").unwrap();
        // let mut log = LedgerLog::<u64>::open(&mut loader, "ledger", 3).unwrap();
        // let mut store = AtomicStore::open(loader).unwrap();

        // // After reloading from disk, the in-order prefix of objects (0-3) should immediately be
        // // available.
        // assert_eq!(
        //     log.subscribe(0).unwrap().take(4).collect::<Vec<_>>().await,
        //     vec![0, 1, 2, 3]
        // );

        // // The remaining items should become available once they can all be yielded in order.
        // log.insert(4, 4).unwrap();
        // log.commit_version().await.unwrap();
        // store.commit_version().unwrap();
        // assert_eq!(
        //     log.subscribe(0).unwrap().take(6).collect::<Vec<_>>().await,
        //     vec![0, 1, 2, 3, 4, 5]
        // );

        // // Dropping the log should terminate the stream.
        // let stream = log.subscribe(0).unwrap();
        // drop(log);
        // assert_eq!(stream.collect::<Vec<_>>().await, vec![0, 1, 2, 3, 4, 5]);
    }
}