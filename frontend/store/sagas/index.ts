import { all } from "typed-redux-saga";
import { jobsRootSaga } from "./jobs";
import { resumeRootSaga } from "./resumes";

export default function* RootSaga() {
  yield all([jobsRootSaga(), resumeRootSaga()]);
}
