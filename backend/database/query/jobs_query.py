get_user_recent_jobs_query = """
    SELECT *
    FROM jobs
    ORDER BY id ASC
    LIMIT ? OFFSET ?
"""

insert_job_offer = """
INSERT INTO jobs (key, title, company, url,location, stage, first_seen, last_updated)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
"""

insert_job_event = """
INSERT INTO job_events (job_id, stage, event_date, note)
VALUES (?, ?, ?, ?)
"""


get_job_by_id_query = "SELECT * FROM jobs WHERE id = ?"


delete_job_events_by_job_id = "DELETE FROM job_events WHERE job_id = ?"
delete_job_rankings_by_job_id = "DELETE FROM job_rankings WHERE job_id = ?"
clear_duplicate_refs = "UPDATE jobs SET duplicate_of = NULL WHERE duplicate_of = ?"
delete_job_by_id = "DELETE FROM jobs WHERE id = ?"
