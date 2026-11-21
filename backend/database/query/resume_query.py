insert_resume = """
INSERT INTO resumes (filename, content_type, data, skills,title,category) VALUES (?, ?, ?, ?, ?, ?)
"""


select_resume_by_filename = "SELECT * FROM resumes where filename = ?"
select_resume_by_id = "SELECT * FROM resumes where id = ?"

get_resumes = """
    SELECT *
    FROM resumes
    ORDER BY id ASC
    LIMIT ? OFFSET ?
"""


delete_resume = """
DELETE FROM resumes WHERE id = ?
"""
