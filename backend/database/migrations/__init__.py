from .jobs_migration import job_events_table, job_rankings_table, jobs_table
from .llm_cache import llm_cache_table
from .resume_migration import resume_table

MIGRATIONS = [
    jobs_table,
    job_events_table,
    job_rankings_table,
    resume_table,
    llm_cache_table,
]


def run_migrations(conn):
    for sql in MIGRATIONS:
        conn.execute(sql)
    conn.commit()
