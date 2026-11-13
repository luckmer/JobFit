"use server";

import type { Job, JobPatch, JobsResponse } from "@interfaces/job/types";
import { getApi } from "@libs/ApiService";
import type { NewApplicationFormValues } from "@schemas/newApplicationSchema";
import { ENDPOINTS } from "@static/endpoints";
import { format } from "date-fns";
import { v7 } from "uuid";

export const getJobsApi = async () => {
  const api = getApi();

  try {
    return await api.get<JobsResponse>(ENDPOINTS.JOBS);
  } catch (err) {
    console.log(err, "get jobs error");
  }
};

export const createJobApi = async (job: NewApplicationFormValues) => {
  const api = getApi();

  return await api.post<Job>(ENDPOINTS.CREATE, {
    key: v7(),
    title: job.jobTitle,
    company: job.company,
    url: job.postingUrl,
    stage: job.stage,
    notes: job.notes,
    location: job.location,
    salary: job.salaryRange,
    follow_up_date: job.followUpDate,
    employment_type: job.employmentType,
    applied_date: job.applicationDate,
    job_description: job.jobDescription,
    first_seen: format(new Date(), "yyyy-MM-dd"),
    last_updated: format(new Date(), "yyyy-MM-dd"),
    event_date: format(new Date(), "yyyy-MM-dd"),
  });
};

export const patchJobApi = async (id: number, payload: JobPatch) => {
  const api = getApi();

  try {
    return await api.patch<Job>(`${ENDPOINTS.PATCH}/${id}`, payload);
  } catch (err) {
    console.error("failed to patch job", err);
    throw err;
  }
};

export const deleteJobApi = async (id: number) => {
  const api = getApi();

  try {
    await api.delete(`${ENDPOINTS.DELETE}/${id}`);
  } catch (err) {
    console.log("failed to delete job", err);
  }
};
