#!/usr/bin/python3
"""FIFO cache Module"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class"""

    def __init__(self):
        """Initialise FIFOCache"""
        super().__init__()

    def put(self, key, item):
        """Adds an item in the cache."""
        if key is None or item is None:
            return
        if key in self.cache_data:
            del self.cache_data[key]
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discarded_key, _ = self.cache_data.popitem(last=False)
            print("DISCARD:", discarded_key)
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key"""
        if key is not None and key in self.cache_data:
            return self.cache_data
        return None
