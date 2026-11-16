from pydantic import BaseModel


class LLmCacheResponse(BaseModel):
    cache_key: str
    message: str
