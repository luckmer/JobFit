from pydantic import BaseModel


class ResumeSchema(BaseModel):
    id: int
    filename: str
    content_type: str
    data: bytes
    created_at: str
