import { all } from "typed-redux-saga";
import { jobsRootSaga } from "./jobs";
import { opencodeRootSaga } from "./opencode";
import { resumeRootSaga } from "./resume";

export default function* RootSaga() {
  yield all([jobsRootSaga(), resumeRootSaga(), opencodeRootSaga()]);
}
