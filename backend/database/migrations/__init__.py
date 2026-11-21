from .jobs_migration import job_events_table, jobs_table, applications_table
from .llm_migration import llm_cache_table, llm_profile_table
from .resume_migration import resume_table

MIGRATIONS = [
    jobs_table,
    job_events_table,
    resume_table,
    llm_cache_table,
    applications_table,
    llm_profile_table,
]


def run_migrations(conn):
    for sql in MIGRATIONS:
        conn.execute(sql)
    conn.commit()
