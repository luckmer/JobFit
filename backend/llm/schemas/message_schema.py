from typing import Any

from pydantic import BaseModel, ConfigDict


class MessageTime(BaseModel):
    created: int
    streamed: int | None = None
    completed: int | None = None


class ModelInfo(BaseModel):
    id: str
    providerID: str
    variant: str


class ToolState(BaseModel):
    model_config = ConfigDict(extra="allow")
    status: str
    input: Any = None
    output: Any = None


class PartTime(BaseModel):
    model_config = ConfigDict(extra="allow")
    created: int | None = None
    completed: int | None = None


class Content(BaseModel):
    model_config = ConfigDict(extra="allow")
    type: str
    text: str | None = None
    id: str | None = None
    name: str | None = None
    state: ToolState | None = None
    time: PartTime | None = None


class Snapshot(BaseModel):
    start: str
    end: str | None = None
    files: list[str] = []


class CacheTokens(BaseModel):
    read: int
    write: int


class Tokens(BaseModel):
    input: int
    output: int
    reasoning: int
    cache: CacheTokens


class MessageData(BaseModel):
    id: str
    time: MessageTime
    type: str
    text: str | None = None
    agent: str | None = None
    model: ModelInfo | None = None
    content: list[Content] = []
    snapshot: Snapshot | None = None
    finish: str | None = None
    rawFinish: str | None = None
    cost: float | None = None
    tokens: Tokens | None = None
    outcome: str | None = None


class Cursor(BaseModel):
    previous: str
    next: str


class MessageResponse(BaseModel):
    model_config = ConfigDict(extra="allow")
    data: list[MessageData]
    cursor: Cursor
