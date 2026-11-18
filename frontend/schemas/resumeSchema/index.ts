import { z } from "zod";

export const resumeSchema = z.object({
  title: z.string().trim().min(1, "Resume name is required"),
  category: z.string().trim().min(1, "Category is required"),
  skills: z.string().trim().optional(),
  file: z.custom<File>((v) => v instanceof File, {
    message: "File is required",
  }),
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;
