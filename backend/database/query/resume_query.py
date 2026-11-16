insert_resume = """
INSERT INTO resumes (filename, content_type, data, skills) VALUES (?, ?, ?, ?)
"""


select_resume_by_filename = "SELECT * FROM resumes where filename = ?"

get_resumes = """
    SELECT *
    FROM resumes
    ORDER BY id ASC
    LIMIT ? OFFSET ?
"""
