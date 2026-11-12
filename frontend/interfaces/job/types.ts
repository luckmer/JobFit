import type { ColumnId } from "@interfaces/overview/types";

export type Job = {
  id: number;
  key: string;
  stage: ColumnId;
  title: string;
  company: string;
  url: string;
  portal?: string | null;
  work_mode?: string | null;
  salary?: string | null;
  posted?: string | null;
  location: string;
  first_seen?: string | null;
  last_updated?: string | null;
  fit?: string | null;
  notes?: string | null;
  outcome?: string | null;
  duplicate_of?: number | null;
  excluded_reason?: string | null;
  posting_file?: string | null;
  application_dir?: string | null;
};

export type CreateJobInput = {
  key: string;
  title: string;
  company: string;
  url: string;
  location: string;
  status: string;
  stage: string;
  first_seen: string; // "YYYY-MM-DD"
  last_updated: string; // "YYYY-MM-DD"
  event_date: string; // "YYYY-MM-DD"
};

export type JobsResponse = {
  jobs: Job[];
  next_cursor: string | null;
};

export interface JobPatch {
  stage?: string;
  title?: string;
  company?: string;
  url?: string;
  portal?: string;
  work_mode?: string;
  salary?: string;
  posted?: string;
  status?: string;
  fit?: string;
  location?: string;
  notes?: string;
  outcome?: string;
  duplicate_of?: number;
  excluded_reason?: string;
  posting_file?: string;
  application_dir?: string;
}
