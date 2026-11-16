insert_llm_cache_id = """
INSERT INTO llm_cache (cache_key, message) VALUES (?,?)
"""

get_llm_cache_id = """
SELECT * FROM llm_cache where cache_key = ?
"""
