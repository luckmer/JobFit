from pydantic import BaseModel, ConfigDict, Field


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
