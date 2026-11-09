from .jobs_migration import jobs_table, job_events_table, job_rankings_table

MIGRATIONS = [
    jobs_table,
    job_events_table,
    job_rankings_table,
]


def run_migrations(conn):
    for sql in MIGRATIONS:
        conn.execute(sql)
    conn.commit()
