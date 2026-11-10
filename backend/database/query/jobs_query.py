get_user_recent_jobs_query = """
    SELECT *
    FROM jobs
    ORDER BY id ASC
    LIMIT ? OFFSET ?
"""

insert_job_offer = """
INSERT INTO jobs (key, title, company, url, status,stage, first_seen, last_updated)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
"""

insert_job_event = """
INSERT INTO job_events (job_id, stage, event_date, note)
VALUES (?, ?, ?, ?)
"""
