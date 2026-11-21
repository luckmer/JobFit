import hashlib
from typing import Annotated

from fastapi import Depends

from database import Database, get_db
from database.query import (
    get_llm_cache_id,
    insert_llm_cache_id,
    insert_llm_model,
    get_llm_model,
)
from schemas import LLMCacheResponse, ActiveModel


class LLMRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def build_cache_key(self, words: str) -> str:
        return hashlib.sha256(words.encode("utf-8")).hexdigest()

    def get(self, key: str) -> LLMCacheResponse | None:
        row = self.db.fetch_one(get_llm_cache_id, (key,))
        return LLMCacheResponse(**row) if row else None

    def save(self, key: str, message: str) -> None:
        self.db.execute(insert_llm_cache_id, (key, message))

    def set_active_model(self, model: str) -> None:
        self.db.execute(insert_llm_model, (model,))

    def get_active_model(self) -> ActiveModel | None:
        row = self.db.fetch_one(get_llm_model)
        return ActiveModel(**row) if row else None


def get_llm_repository(
    db: Annotated[Database, Depends(get_db)],
) -> LLMRepository:
    return LLMRepository(db)
