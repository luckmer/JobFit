"use client";

import type { ResumeResponse } from "@interfaces/resume/types";
import { getApi } from "@libs/ApiService";
import { ENDPOINTS } from "@static/endpoints";

export const getResumesApi = async (): Promise<ResumeResponse | undefined> => {
  const api = getApi();

  try {
    return await api.get<ResumeResponse>(ENDPOINTS.RESUME_RESUME);
  } catch (err) {
    console.error(err);
  }
};

export const createResume = async (data: FormData) => {
  const api = getApi();

  data.append("title", "Frontend Developer");
  data.append("category", "Frontend");
  try {
    await api.postFile(ENDPOINTS.RESUME_CREATE, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
