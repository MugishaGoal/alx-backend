#!/usr/bin/python3
"""LFU Cache Module"""


from base_caching import BaseCaching
from collections import Counter


class LFUCache(BaseCaching):
    """Defines a caching system using the LFU algorithm."""

    def __init__(self):
        """Initialize the LFUCache."""
        super().__init__()
        self.frequency = Counter()

    def put(self, key, item):
        """Adds an item in the cache."""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            min_freq = min(self.frequency.values())
            keys_to_discard = [k for k, v in self.frequency.items() if v == min_freq]
            if len(keys_to_discard) > 1:
                lru_key = min(self.cache_data, key=self.frequency.get)
                print("DISCARD:", lru_key)
                self.cache_data.pop(lru_key)
                self.frequency.pop(lru_key)
            else:
                lfu_key = min(keys_to_discard, key=self.cache_data.get)
                print("DISCARD:", lfu_key)
                self.cache_data.pop(lfu_key)
                self.frequency.pop(lfu_key)
        self.cache_data[key] = item
        self.frequency[key] += 1

    def get(self, key):
        """Gets an item from the cache."""
        if key in self.cache_data:
            self.frequency[key] += 1
            return self.cache_data[key]
        else:
            return None
