from datetime import date

from pydantic import BaseModel, ConfigDict


class JobSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    key: str
    stage: str
    title: str | None = None
    company: str | None = None
    url: str | None = None
    portal: str | None = None
    work_mode: str | None = None
    salary: str | None = None
    posted: str | None = None
    first_seen: str | None = None
    last_updated: str | None = None
    fit: str | None = None
    location: str
    notes: str | None = None
    outcome: str | None = None
    duplicate_of: int | None = None
    excluded_reason: str | None = None
    posting_file: str | None = None
    application_dir: str | None = None


class CreateJobSchema(BaseModel):
    key: str
    title: str
    company: str
    url: str
    stage: str
    first_seen: date
    last_updated: date
    event_date: date
    location: str


class JobsResponse(BaseModel):
    jobs: list[JobSchema]
    next_cursor: str | None = None


class JobPatch(BaseModel):
    model_config = ConfigDict(extra="forbid")
    stage: str
    event_date: date
    title: str | None = None
    company: str | None = None
    url: str | None = None
    portal: str | None = None
    work_mode: str | None = None
    salary: str | None = None
    posted: str | None = None
    fit: str | None = None
    location: str | None = None
    notes: str | None = None
    outcome: str | None = None
    duplicate_of: int | None = None
    excluded_reason: str | None = None
    posting_file: str | None = None
    application_dir: str | None = None
