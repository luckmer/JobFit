llm_cache_table = """
CREATE TABLE IF NOT EXISTS llm_cache (
  cache_key  TEXT PRIMARY KEY,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""


llm_profile_table = """
CREATE TABLE IF NOT EXISTS llm_profile_table (
  id    INTEGER PRIMARY KEY CHECK (id = 1),
  model TEXT NOT NULL
);
"""
