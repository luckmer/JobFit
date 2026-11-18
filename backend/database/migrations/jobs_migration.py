jobs_table = f"""
CREATE TABLE IF NOT EXISTS jobs (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  key              TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  company          TEXT NOT NULL,
  url              TEXT,
  salary           TEXT,
  employment_type  TEXT,
  location         TEXT,
  job_description  TEXT,
  stage            TEXT NOT NULL,
  notes            TEXT,
  duplicate_of     INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
  reason           TEXT,
  first_seen       TEXT NOT NULL DEFAULT (datetime('now')),
  last_updated     TEXT NOT NULL DEFAULT (datetime('now'))
);
"""

applications_table = """
CREATE TABLE IF NOT EXISTS applications (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id           INTEGER NOT NULL UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
  resume_id        INTEGER ,
  applied_date     TEXT,
  outcome          TEXT,
  follow_up_date   TEXT
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
