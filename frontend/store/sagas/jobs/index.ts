import { deleteJobApi, getJobsApi, patchJobApi } from "@api/jobs";
import type { PayloadAction } from "@reduxjs/toolkit";
import { jobActions, type PayloadTypes } from "@store/reducers/jobs";
import { jobsSelector } from "@store/selectors/jobs";
import {
  all,
  call,
  debounce,
  put,
  select,
  takeEvery,
  takeLatest,
} from "typed-redux-saga";

export function* fetchJobs() {
  const data = yield* call(getJobsApi);

  yield* put(
    jobActions.setJobs({
      jobs: data?.jobs ?? [],
      nextCursor: data?.next_cursor ?? null,
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
    yield* call(patchJobApi, parseInt(action.payload.id, 10), {
      stage: job.stage,
    });
  } catch (err) {
    console.log("failed to patch job", err);
    yield* put(
      jobActions.updateJobStage({
        id: action.payload.id,
        column: action.payload.prevColumn,
        prevColumn: action.payload.prevColumn,
      }),
    );
  }
}

export function* deleteJob(action: PayloadAction<PayloadTypes["deleteJob"]>) {
  yield* call(deleteJobApi, action.payload);
  yield* put(jobActions.removeJob(action.payload));
}

export function* fetchJobsSaga() {
  yield* takeLatest(jobActions.fetchJobs, fetchJobs);
}

export function* updateJobStageSaga() {
  yield* debounce(200, jobActions.updateJobStage, updateJobStage);
}

export function* deleteJobSaga() {
  yield* takeEvery(jobActions.deleteJob, deleteJob);
}

export function* jobsRootSaga() {
  yield all([fetchJobsSaga(), updateJobStageSaga(), deleteJobSaga()]);
}
