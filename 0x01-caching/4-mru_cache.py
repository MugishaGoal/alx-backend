#!/usr/bin/python3
"""MRU Cache Module"""


from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Defines a caching system using the MRU algorithm."""

    def __init__(self):
        """Initialize the MRUCache."""
        super().__init__()

    def put(self, key, item):
        """Adds an item in the cache."""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            mru_key = max(self.cache_data, key=self.cache_data.get)
            print("DISCARD:", mru_key)
            self.cache_data.pop(mru_key)
        self.cache_data[key] = item

    def get(self, key):
        """Gets an item from the cache."""
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
