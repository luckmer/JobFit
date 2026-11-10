"use server";

import { JobsResponse } from "@interfaces//job/types";
import { getApi } from "@libs/ApiService";
import { ENDPOINTS } from "@static/endpoints";

export const getJobs = async () => {
  const api = getApi();

  try {
    return await api.get<JobsResponse>(ENDPOINTS.JOBS);
  } catch (err) {
    console.log(err, "get jobs error");
  }
};
