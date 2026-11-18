"use client";

import type { Resume, ResumeResponse } from "@interfaces/resume/types";
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

export const createResumeApi = async (data: FormData): Promise<Resume> => {
  const api = getApi();

  try {
    return await api.postFile<Resume>(ENDPOINTS.RESUME_CREATE, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
