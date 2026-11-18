from pydantic import BaseModel
from fastapi import UploadFile


class ResumeSchema(BaseModel):
    id: int
    filename: str
    data: str
    content_type: str
    created_at: str
    skills: str


class Resume(BaseModel):
    id: int
    filename: str
    content_type: str
    skills: str
    title: str
    category: str
    updated_at: str
    created_at: str


class ResumesResponse(BaseModel):
    resumes: list[Resume]
    next_cursor: str | None = None


class ResumeRatingResponse(BaseModel):
    rating: str
