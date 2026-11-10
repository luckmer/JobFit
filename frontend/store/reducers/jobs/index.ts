import type { Job } from "@interfaces/job/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export const jobStore = "jobStore";

export type IJobState = {
  jobs: Job[];
  jobNextCursor: string | null;
};

export const defaultState: IJobState = {
  jobs: [],
  jobNextCursor: null,
};

export const store = createSlice({
  name: jobStore,
  initialState: defaultState,
  reducers: {
    fetchJobs(state) {
      return state;
    },

    setJobs(
      state,
      action: PayloadAction<{ jobs: Job[]; nextCursor: string | null }>,
    ) {
      state.jobs = action.payload.jobs;
      state.jobNextCursor = action.payload.nextCursor;
      return state;
    },
  },
});

export const jobReducers = store.reducer;
export const jobActions = store.actions;
export type PayloadTypes = PayloadType<typeof jobActions>;
