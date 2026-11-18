get_user_recent_jobs_query = """
    SELECT
        jobs.*,
        applications.id AS application_id,
        applications.resume_id,
        applications.applied_date,
        applications.outcome,
        applications.follow_up_date
    FROM jobs
    INNER JOIN applications ON applications.job_id = jobs.id
    ORDER BY jobs.id ASC
    LIMIT ? OFFSET ?
"""

insert_job_offer = """
INSERT INTO jobs (
    key,
    title,
    company,
    url,
    salary,
    employment_type,
    location,
    job_description,
    stage,
    notes,
    first_seen,
    last_updated
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
"""

insert_job_application = """
INSERT OR IGNORE INTO applications (
  job_id,
  resume_id,
  applied_date,
  follow_up_date
)
VALUES (?, ?, ?, ?)
"""

insert_job_event = """
INSERT INTO job_events (job_id, stage, event_date, note)
VALUES (?, ?, ?, ?)
"""


get_job_by_id_query = """
    SELECT
        jobs.*,
        applications.id AS application_id,
        applications.resume_id,
        applications.applied_date,
        applications.outcome,
        applications.follow_up_date
    FROM jobs
    INNER JOIN applications ON applications.job_id = jobs.id
    WHERE jobs.id = ?
"""


delete_job_events_by_job_id = "DELETE FROM job_events WHERE job_id = ?"
delete_job_application_by_job_id = "DELETE FROM applications WHERE job_id = ?"
clear_duplicate_refs = "UPDATE jobs SET duplicate_of = NULL WHERE duplicate_of = ?"
delete_job_by_id = "DELETE FROM jobs WHERE id = ?"
