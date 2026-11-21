insert_llm_cache_id = """
INSERT INTO llm_cache (cache_key, message) VALUES (?,?)
"""

get_llm_cache_id = """
SELECT * FROM llm_cache where cache_key = ?
"""

insert_llm_model = """
INSERT INTO llm_profile_table (id, model) VALUES (1, ?)
ON CONFLICT(id) DO UPDATE SET model = excluded.model;
"""

get_llm_model = "SELECT model FROM llm_profile_table WHERE id = 1;"
