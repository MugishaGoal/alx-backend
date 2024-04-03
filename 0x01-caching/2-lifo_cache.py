#!/usr/bin/python3
"""A LIFOCahe Module"""


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Defines a caching system using the LIFO algorithm."""

    def __init__(self):
        """Initialize the LIFOCache."""
        super().__init__()

    def put(self, key, item):
        """Adds an item in the cache."""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discarded_key, _ = self.cache_data.popitem()
            print("DISCARD:", discarded_key)
        self.cache_data[key] = item

    def get(self, key):
        """Gets an item from the cache."""
        return self.cache_data.get(key, None)
