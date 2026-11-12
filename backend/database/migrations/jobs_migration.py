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
  url                  TEXT NOT NULL,
  portal               TEXT,
  work_mode            TEXT,
  salary               TEXT,
  posted               TEXT,
  location             TEXT NOT NULL,
  stage               TEXT NOT NULL DEFAULT 'new'
                         CHECK (stage IN ({status_list})),
  first_seen           TEXT,
  last_updated         TEXT,
  fit                  TEXT,
  notes                TEXT,
  outcome              TEXT,
  duplicate_of         INTEGER REFERENCES jobs(id),
  excluded_reason      TEXT,
  posting_file         TEXT,
  application_dir      TEXT
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
