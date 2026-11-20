from pydantic import BaseModel, ConfigDict, Field
from typing import Any, Literal
from pydantic.alias_generators import to_camel


##### PROMPT
class PromptTime(BaseModel):
    created: int


class PromptPayload(BaseModel):
    text: str


class PromptData(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: str
    session_id: str = Field(alias="sessionID")
    time: PromptTime
    type: str
    payload: PromptPayload
    delivery: str


class PromptResponse(BaseModel):
    data: PromptData


#####
###### SESSION


class SessionModel(BaseModel):
    id: str
    providerID: str
    variant: str | None = None


class SessionCache(BaseModel):
    read: int
    write: int


class SessionTokens(BaseModel):
    input: int
    output: int
    reasoning: int
    cache: SessionCache


class SessionTime(BaseModel):
    created: int
    updated: int


class SessionLocation(BaseModel):
    directory: str


class SessionData(BaseModel):
    id: str
    projectID: str
    model: SessionModel
    cost: float
    tokens: SessionTokens
    time: SessionTime
    subpath: str
    location: SessionLocation


class SessionResponse(BaseModel):
    data: SessionData


#####
##### MESSAGE
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


#####
##### MODELS


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class Location(CamelModel):
    directory: str


class Compatibility(CamelModel):
    reasoning_field: str


class ProviderSettings(CamelModel):
    api_key: str
    base_url: str = Field(alias="baseURL")
    provider: str


class Capabilities(CamelModel):
    tools: bool
    input: list[str]
    output: list[str]
    temperature: bool | None = None


class VariantSettings(CamelModel):
    reasoning_effort: str


class Variant(CamelModel):
    id: str
    settings: VariantSettings


class ModelTime(CamelModel):
    released: int


class CacheCost(CamelModel):
    read: float
    write: float


class Cost(CamelModel):
    input: float
    output: float
    cache: CacheCost


class Limit(CamelModel):
    context: int
    input: int | None = None
    output: int


class Model(CamelModel):
    id: str
    model_id: str = Field(alias="modelID")
    provider_id: str = Field(alias="providerID")
    type: str
    family: str | None = None
    name: str
    compatibility: Compatibility | None = None
    package: str
    settings: ProviderSettings
    capabilities: Capabilities
    variants: list[Variant] = []
    time: ModelTime
    cost: list[Cost]
    status: Literal["active"] | str
    enabled: bool
    limit: Limit


class ModelsResponse(CamelModel):
    location: Location
    data: list[Model]


class ModelCapabilitiesOut(CamelModel):
    tools: bool
    image_input: bool
    reasoning: bool


class ModelLimitsOut(CamelModel):
    context: int
    output: int


class ModelOut(CamelModel):
    id: str
    name: str
    provider_id: str
    family: str | None = None
    capabilities: ModelCapabilitiesOut
    limits: ModelLimitsOut
    reasoning_efforts: list[str] = []  # np. ["low", "high", "max"]
    free: bool
    released_at: int  # epoch ms


#####
##### INTERRUPTED


class InterruptedResponse(BaseModel):
    interrupted: bool
