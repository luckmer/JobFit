import { all } from "typed-redux-saga";
import { jobsRootSaga } from "./jobs";

export default function* RootSaga() {
  yield all([jobsRootSaga()]);
}
