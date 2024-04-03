#!/usr/bin/env python3
"""A function named index_range that takes two integer arguments page
and page_size
"""


def index_range(page: int, page_size: int) -> tuple[int, int]:
    """Return a tuple of start and end index for a given page and page size"""
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return end_index
