export type Job = {
  id: number;
  key: string;
  stage: string;
  title?: string | null;
  company?: string | null;
  url?: string | null;
  portal?: string | null;
  work_mode?: string | null;
  salary?: string | null;
  posted?: string | null;
  status?: string | null;
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
