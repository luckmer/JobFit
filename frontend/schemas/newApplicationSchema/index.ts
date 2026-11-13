import type { ColumnId } from "@interfaces/overview/types";
import * as z from "zod";

export const newApplicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  postingUrl: z.url("Invalid URL").optional().or(z.literal("")),
  jobDescription: z.string().optional(),
  salaryRange: z.string().optional(),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  applicationDate: z.string().optional(),
  followUpDate: z.string().optional(),
  stage: z.custom<ColumnId>(),
  notes: z.string().optional(),
});

export type NewApplicationFormValues = z.infer<typeof newApplicationSchema>;
