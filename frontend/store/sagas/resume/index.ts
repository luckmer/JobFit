import { getResumesApi } from "@api/resume";
import { resumeActions } from "@store/reducers/resume";
import { all, call, put, takeLatest } from "typed-redux-saga";

export function* fetchResumes() {
  const data = yield* call(getResumesApi);

  yield* put(
    resumeActions.setResumes({
      resumes: data?.resumes ?? [],
      nextCursor: data?.next_cursor ?? null,
      isLoadingResumes: false,
    }),
  );
}

export function* fetchResumesSaga() {
  yield* takeLatest(resumeActions.fetchResumes, fetchResumes);
}

export function* resumeRootSaga() {
  yield all([fetchResumesSaga()]);
}
