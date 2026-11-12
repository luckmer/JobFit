"use server";

import type { Job, JobPatch, JobsResponse } from "@interfaces/job/types";
import { getApi } from "@libs/ApiService";
import { ENDPOINTS } from "@static/endpoints";

export const getJobsApi = async () => {
  const api = getApi();

  try {
    return await api.get<JobsResponse>(ENDPOINTS.JOBS);
  } catch (err) {
    console.log(err, "get jobs error");
  }
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
