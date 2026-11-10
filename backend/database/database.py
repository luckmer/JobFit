import sqlite3
from collections.abc import Sequence
from typing import Any

from .migrations import run_migrations


class Database:
    def __init__(self, path: str = "database.db") -> None:
        self._path = path
        self._conn: sqlite3.Connection | None = None

    @property
    def conn(self) -> sqlite3.Connection:
        if self._conn is None:
            raise RuntimeError("Database is not connected.")
        return self._conn

    def connect(self) -> None:
        if self._conn is not None:
            return
        self._conn = sqlite3.connect(self._path, check_same_thread=False)
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._conn.execute("PRAGMA journal_mode = WAL")
        self.init_tables()

    def init_tables(self) -> None:

        run_migrations(self.conn)
        self.conn.commit()

    def close(self) -> None:
        if self._conn is not None:
            self._conn.close()
            self._conn = None

    def execute(self, query: str, params: Sequence[Any] = ()) -> int | None:
        cur = self.conn.execute(query, params)
        self.conn.commit()
        return cur.lastrowid

    def fetch_one(self, query: str, params: Sequence[Any] = ()) -> dict | None:
        row = self.conn.execute(query, params).fetchone()
        return dict(row) if row else None

    def fetch_all(self, query: str, params: Sequence[Any] = ()) -> list[dict]:
        return [dict(r) for r in self.conn.execute(query, params).fetchall()]


db = Database()


def get_db() -> Database:
    return db
