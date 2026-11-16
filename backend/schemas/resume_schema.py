from pydantic import BaseModel


class ResumeSchema(BaseModel):
    id: int
    filename: str
    content_type: str
    data: str
    created_at: str
    skills: str


class ResumesResponse(BaseModel):
    resumes: list[ResumeSchema]
    next_cursor: str | None = None


class ResumeRatingResponse(BaseModel):
    rating: str
