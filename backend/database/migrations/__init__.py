from .jobs_migration import job_events_table, job_rankings_table, jobs_table
from .resume_migration import resume_table

MIGRATIONS = [jobs_table, job_events_table, job_rankings_table, resume_table]


def run_migrations(conn):
    for sql in MIGRATIONS:
        conn.execute(sql)
    conn.commit()
