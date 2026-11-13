STATUSES = (
    "new",
    "ranked",
    "applied",
    "screening",
    "techInterview",
    "finalRound",
    "offer",
    "rejected",
    "skipped",
)

status_list = ", ".join(f"'{s}'" for s in STATUSES)

jobs_table = f"""
CREATE TABLE IF NOT EXISTS jobs (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  key                  TEXT NOT NULL UNIQUE,
  title                TEXT NOT NULL,
  company              TEXT NOT NULL,
  url                  TEXT,
  salary               TEXT,
  employment_type      TEXT,
  location             TEXT,
  stage               TEXT NOT NULL DEFAULT 'new'
                         CHECK (stage IN ({status_list})),
  first_seen           TEXT,
  last_updated         TEXT,
  notes                TEXT,
  job_description      TEXT,
  applied_date         TEXT,
  outcome              TEXT,
  duplicate_of         INTEGER REFERENCES jobs(id),
  excluded_reason      TEXT,
  application_dir      TEXT,
  follow_up_date       TEXT
);
"""

job_events_table = """
CREATE TABLE IF NOT EXISTS job_events (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id               INTEGER NOT NULL REFERENCES jobs(id),
  stage                TEXT NOT NULL,
  event_date           TEXT NOT NULL,
  note                 TEXT
);
"""

job_rankings_table = """
CREATE TABLE IF NOT EXISTS job_rankings (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id               INTEGER NOT NULL REFERENCES jobs(id),
  ranked_at            TEXT,
  score                REAL,
  verdict              TEXT,
  deadline             TEXT,
  location             TEXT,
  location_note        TEXT,
  technical            REAL,
  experience           REAL,
  behavioral           REAL,
  career               REAL
);
"""
