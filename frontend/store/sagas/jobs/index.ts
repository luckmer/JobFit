import { createJobApi, deleteJobApi, getJobsApi, patchJobApi } from "@api/jobs";
import type { PayloadAction } from "@reduxjs/toolkit";
import { jobActions, type PayloadTypes } from "@store/reducers/jobs";
import { jobsSelector } from "@store/selectors/jobs";
import { format } from "date-fns";
import { all, call, debounce, put, select, takeEvery } from "typed-redux-saga";

export function* fetchJobs() {
  const data = yield* call(getJobsApi);

  yield* put(
    jobActions.setJobs({
      jobs: data?.jobs ?? [],
      nextCursor: data?.next_cursor ?? null,
      isLoadingJobs: false,
    }),
  );
}

export function* updateJobStage(
  action: PayloadAction<PayloadTypes["updateJobStage"]>,
) {
  const jobs = yield* select(jobsSelector.jobs);

  const index = jobs.findIndex(
    (job) => job.id === parseInt(action.payload.id, 10),
  );

  if (index === -1) {
    return;
  }

  const job = jobs[index];

  try {
    const jobPayload = {
      last_updated: format(Date.now(), "yyyy-MM-dd"),
      event_date: action.payload.date,
      stage: job.stage,
    };

    yield* call(patchJobApi, parseInt(action.payload.id, 10), {
      job_payload: jobPayload,
    });
  } catch (err) {
    console.error("failed to patch job", err);
    yield* put(
      jobActions.updateJobStage({
        id: action.payload.id,
        date: action.payload.date,
        column: action.payload.prevColumn,
        prevColumn: action.payload.prevColumn,
      }),
    );
  }
}

export function* createJob(action: PayloadAction<PayloadTypes["createJob"]>) {
  try {
    const job = yield* call(createJobApi, action.payload);
    yield* put(jobActions.setJob(job));
  } catch (err) {
    console.error("failed to create job", err);
  }
}

export function* deleteJob(action: PayloadAction<PayloadTypes["deleteJob"]>) {
  yield* call(deleteJobApi, action.payload);
  yield* put(jobActions.removeJob(action.payload));
}

export function* fetchJobsSaga() {
  yield* debounce(200, jobActions.fetchJobs, fetchJobs);
}

export function* updateJobStageSaga() {
  yield* debounce(200, jobActions.updateJobStage, updateJobStage);
}

export function* deleteJobSaga() {
  yield* takeEvery(jobActions.deleteJob, deleteJob);
}

export function* createJobSaga() {
  yield* takeEvery(jobActions.createJob, createJob);
}

export function* jobsRootSaga() {
  yield all([
    fetchJobsSaga(),
    updateJobStageSaga(),
    deleteJobSaga(),
    createJobSaga(),
  ]);
}
