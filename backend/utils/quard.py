from collections.abc import Hashable
from functools import lru_cache


class Quard:
    def __init__(self) -> None:
        self._keys: set[Hashable] = set()

    def add_key(self, key: Hashable) -> bool:

        if key in self._keys:
            return False

        self._keys.add(key)
        return True

    def remove_key(self, key: Hashable) -> bool:
        if key in self._keys:
            self._keys.remove(key)
            return True
        return False


quard = Quard()


def get_quard() -> Quard:
    return quard
