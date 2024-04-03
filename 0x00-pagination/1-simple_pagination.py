#!/usr/bin/env python3
"""A defines a Server class for pagination of a dataset containing popular
baby names"""


import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return specified page of dataset according to pagination parameters
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = self.index_range(page, page_size)
        return self.dataset()[start_index:end_index]

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        """Return a tuple containing the start index and end index for
        pagination"""
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        if page > total_pages:
            return 0, 0  # Return empty list if page is out of range
        else:
            start_index = (page - 1) * page_size
            end_index = min(start_index + page_size, total_items)
            return start_index, end_index


if __name__ == "__main__":
    server = Server()
