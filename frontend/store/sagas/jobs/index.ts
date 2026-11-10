"use client";
import { getJobs } from "@api/jobs";
import { jobActions } from "@store/reducers/jobs";
import { all, call, put, takeLatest } from "typed-redux-saga";

export function* fetchJobs() {
  const data = yield* call(getJobs);

  yield* put(
    jobActions.setJobs({
      jobs: data?.jobs ?? [],
      nextCursor: data?.next_cursor ?? null,
    }),
  );
}

export function* fetchJobsSaga() {
  yield* takeLatest(jobActions.fetchJobs, fetchJobs);
}

export function* jobsRootSaga() {
  yield all([fetchJobsSaga()]);
}
