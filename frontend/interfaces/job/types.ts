import type { ColumnId } from "@interfaces/overview/types";

export type Job = {
  id: number;
  key: string;
  stage: ColumnId;
  title: string;
  company: string;
  url?: string;
  salary?: string;
  employment_type?: string;
  location?: string;
  job_description?: string;
  notes?: string;
  duplicate_of?: number;
  reason?: string;
  first_seen?: string; // "YYYY-MM-DD"
  last_updated?: string; // "YYYY-MM-DD"
  applied_date?: string; // "YYYY-MM-DD"
  outcome?: string;
  follow_up_date?: string; // "YYYY-MM-DD"
  resume_id?: string;
};

export type JobsResponse = {
  jobs: Job[];
  next_cursor: string | null;
};

export type JobPatchPayload = {
  last_updated: string;
  event_date: string;
  stage: ColumnId;
  title?: string;
  company?: string;
  url?: string;
  salary?: string;
  employment_type?: string;
  location?: string;
  job_description?: string;
  notes?: string;
  duplicate_of?: number;
  reason?: string;
  first_seen?: string;
};

export type ApplicationsPatchPayload = {
  resume_id?: string;
  applied_date?: string;
  follow_up_date?: string;
  outcome?: string;
};

export interface JobPatch {
  job_payload?: JobPatchPayload;
  applications_payload?: ApplicationsPatchPayload;
}
