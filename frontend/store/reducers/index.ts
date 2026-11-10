import { combineReducers } from "@reduxjs/toolkit";
import { uiReducers, uiStore } from "./ui";
import { jobStore, jobReducers } from "./jobs";

export const index = combineReducers({
  [uiStore]: uiReducers,
  [jobStore]: jobReducers,
});
