from pydantic import BaseModel


class LLMCacheResponse(BaseModel):
    cache_key: str
    message: str
