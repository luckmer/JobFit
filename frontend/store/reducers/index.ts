import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { filtersReducers, filtersStore } from "./filters";
import { persistFilters } from "./filters/config";
import { jobReducers, jobStore } from "./jobs";
import { resumeReducers, resumeStore } from "./resume";
import { uiReducers, uiStore } from "./ui";

export const index = combineReducers({
  [filtersStore]: persistReducer(persistFilters, filtersReducers),
  [resumeStore]: resumeReducers,
  [uiStore]: uiReducers,
  [jobStore]: jobReducers,
});
