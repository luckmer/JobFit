from datetime import date

from pydantic import BaseModel, ConfigDict


class JobSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    key: str
    stage: str
    title: str
    company: str
    url: str | None = None
    location: str | None = None
    salary: str | None = None
    employment_type: str | None = None
    first_seen: str | None = None
    last_updated: str | None = None
    applied_date: str | None = None
    job_description: str | None = None
    notes: str | None = None
    outcome: str | None = None
    duplicate_of: int | None = None
    excluded_reason: str | None = None
    application_dir: str | None = None
    follow_up_date: date | None = None


class CreateJobSchema(BaseModel):
    key: str
    title: str
    company: str
    stage: str
    url: str | None = None
    location: str | None = None
    notes: str | None = None
    salary: str | None = None
    job_description: str | None = None
    employment_type: str | None = None
    applied_date: date | None = None
    follow_up_date: date | None = None
    last_updated: date | None = None
    first_seen: date | None = None
    event_date: date


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
    salary: str | None = None
    employment_type: str | None = None
    location: str | None = None
    notes: str | None = None
    job_description: str | None = None
    applied_date: str | None = None
    outcome: str | None = None
    duplicate_of: int | None = None
    excluded_reason: str | None = None
    application_dir: str | None = None
    follow_up_date: str | None = None
    first_seen: str | None = None
    last_updated: str | None = None
