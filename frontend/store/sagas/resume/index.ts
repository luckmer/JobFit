import { createResumeApi, getResumesApi } from "@api/resume";
import type { Resume } from "@interfaces/resume/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type PayloadTypes, resumeActions } from "@store/reducers/resume";
import { all, call, put, takeEvery, takeLatest } from "typed-redux-saga";
import { v7 } from "uuid";
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

export function* createResume(
  action: PayloadAction<PayloadTypes["createResume"]>,
) {
  const id = v7();

  try {
    const staticResume: Resume = {
      content_type: "",
      created_at: new Date().toISOString(),
      filename: "",
      id: 0,
      skills: JSON.stringify([]),
      title: "",
      category: "",
      is_default: true,
      default_id: id,
      updated_at: new Date().toISOString(),
    };
    yield* put(resumeActions.setResume(staticResume));
    const resume = yield* call(createResumeApi, action.payload);

    yield* put(resumeActions.removeDefaultResume(id));
    yield* put(resumeActions.setResume(resume));
  } catch (err) {
    yield* put(resumeActions.removeDefaultResume(id));
    console.error("failed to create job", err);
  }
}

export function* fetchResumesSaga() {
  yield* takeLatest(resumeActions.fetchResumes, fetchResumes);
}

export function* createResumeSaga() {
  yield* takeEvery(resumeActions.createResume, createResume);
}

export function* resumeRootSaga() {
  yield all([fetchResumesSaga(), createResumeSaga()]);
}
