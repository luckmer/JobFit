import { combineReducers } from "@reduxjs/toolkit";
import { jobReducers, jobStore } from "./jobs";
import { resumeReducers, resumeStore } from "./resume";
import { uiReducers, uiStore } from "./ui";

export const index = combineReducers({
  [resumeStore]: resumeReducers,
  [uiStore]: uiReducers,
  [jobStore]: jobReducers,
});
