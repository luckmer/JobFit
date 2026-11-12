import { combineReducers } from "@reduxjs/toolkit";
import { jobReducers, jobStore } from "./jobs";
import { uiReducers, uiStore } from "./ui";

export const index = combineReducers({
  [uiStore]: uiReducers,
  [jobStore]: jobReducers,
});
