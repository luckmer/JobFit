from datetime import date

from pydantic import BaseModel, ConfigDict


class JobSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    key: str
    stage: str
    title: str
    company: str
    url: str
    salary: str | None = None
    employment_type: str | None = None
    location: str | None = None
    job_description: str | None = None
    notes: str | None = None
    duplicate_of: int | None = None
    reason: str | None = None
    first_seen: str | None = None
    last_updated: str | None = None
    applied_date: str | None = None
    outcome: str | None = None
    follow_up_date: date | None = None
    resume_id: int


class CreateJobSchema(BaseModel):
    key: str
    title: str
    company: str
    stage: str
    resume_id: int
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


class JobPayloadSchema(BaseModel):
    model_config = ConfigDict(extra="forbid")
    last_updated: str
    event_date: date
    stage: str
    title: str | None = None
    company: str | None = None
    url: str | None = None
    salary: str | None = None
    employment_type: str | None = None
    location: str | None = None
    job_description: str | None = None
    notes: str | None = None
    duplicate_of: int | None = None
    reason: str | None = None
    first_seen: str | None = None


class AppliocationsPayloadSchema(BaseModel):
    resume_id: int | None = None
    applied_date: date | None = None
    outcome: str | None = None
    follow_up_date: date | None = None


class JobPatch(BaseModel):
    job_payload: JobPayloadSchema | None = None
    applications_payload: AppliocationsPayloadSchema | None = None
