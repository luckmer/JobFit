from pydantic import BaseModel


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
