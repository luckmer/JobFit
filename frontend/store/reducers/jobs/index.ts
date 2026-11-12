import type { Job, JobPatch } from "@interfaces/job/types";
import type { ColumnId } from "@interfaces/overview/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export const jobStore = "jobStore";

export type IJobState = {
  jobs: Job[];
  jobNextCursor: string | null;
  isLoadingJobs: boolean;
};

export const defaultState: IJobState = {
  jobs: [],
  jobNextCursor: null,
  isLoadingJobs: true,
};

export const store = createSlice({
  name: jobStore,
  initialState: defaultState,
  reducers: {
    clearJobs(state) {
      state.jobs = [];
      state.jobNextCursor = null;
    },

    fetchJobs(state) {
      state.isLoadingJobs = true;
      return state;
    },

    setJobs(
      state,
      action: PayloadAction<{
        jobs: Job[];
        nextCursor: string | null;
        isLoadingJobs: boolean;
      }>,
    ) {
      state.jobs = action.payload.jobs;
      state.jobNextCursor = action.payload.nextCursor;
      state.isLoadingJobs = false;
      return state;
    },

    updateJob(state, action: PayloadAction<Job>) {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
      return state;
    },

    updateJobStage(
      state,
      action: PayloadAction<{
        date: string;
        id: string;
        column: ColumnId;
        prevColumn: ColumnId;
      }>,
    ) {
      const index = state.jobs.findIndex(
        (job) => job.id === parseInt(action.payload.id, 10),
      );

      if (index !== -1) {
        state.jobs[index].stage = action.payload.column;
      }

      return state;
    },

    removeJob(state, action: PayloadAction<number>) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      return state;
    },

    patchJob(state, _: PayloadAction<{ data: JobPatch; id: number }>) {
      return state;
    },

    deleteJob(state, _: PayloadAction<number>) {
      return state;
    },
  },
});

export const jobReducers = store.reducer;
export const jobActions = store.actions;
export type PayloadTypes = PayloadType<typeof jobActions>;
