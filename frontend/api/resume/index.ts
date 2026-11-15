"use client";

import { getApi } from "@libs/ApiService";
import { ENDPOINTS } from "@static/endpoints";

export const createResume = async (data: FormData) => {
  const api = getApi();

  try {
    const res = await api.postFile(ENDPOINTS.RESUME_CREATE, data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
