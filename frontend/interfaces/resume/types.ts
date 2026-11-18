export type Resume = {
  content_type: string;
  created_at: string;
  filename: string;
  id: number;
  skills: string;
  title: string;
  category: string;
  updated_at: string;
};

export type ResumeResponse = {
  resumes: Resume[];
  next_cursor: string | null;
};
