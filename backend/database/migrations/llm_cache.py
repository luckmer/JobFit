llm_cache_table = """
CREATE TABLE IF NOT EXISTS llm_cache (
  cache_key  TEXT PRIMARY KEY,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""
