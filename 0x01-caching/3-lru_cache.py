#!/usr/bin/python3
"""LRU Cache Module"""


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """Defines a caching system using the LRU algorithm."""

    def __init__(self):
        """Initialize the LRUCache."""
        super().__init__()
        self.used_order = []

    def put(self, key, item):
        """Adds an item in the cache."""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lru_key = self.used_order.pop(0)
            self.cache_data.pop(lru_key)
            print("DISCARD:", lru_key)
        self.cache_data[key] = item
        self.used_order.append(key)

    def get(self, key):
        """Gets an item from the cache."""
        if key in self.cache_data:
            self.used_order.remove(key)
            self.used_order.append(key)
            return self.cache_data[key]
        else:
            return None
