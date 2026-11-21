from pydantic import BaseModel


class LLMCacheResponse(BaseModel):
    cache_key: str
    message: str


class insertModelSchema(BaseModel):
    id: str
    provider_id: str


class ActiveModelResponse(BaseModel):
    provider_id: str
    model_id: str


class ActiveModel(BaseModel):
    model: str
