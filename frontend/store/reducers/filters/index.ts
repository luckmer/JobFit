import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ALL_CATEGORIES, SORT_OPTIONS } from "@static/constants";
import type { PayloadType } from "@store/helper";

export const filtersStore = "filtersStore";

export type IDefaultResumeFilters = {
  search: string;
  category: string;
  sort: string;
};

export const defaultResumeFilters: IDefaultResumeFilters = {
  search: "",
  category: ALL_CATEGORIES,
  sort: SORT_OPTIONS[0],
};

export const defaultState = {
  resumes: defaultResumeFilters,
};

export const store = createSlice({
  name: filtersStore,
  initialState: defaultState,

  reducers: {
    setResumeFilters(
      state,
      action: PayloadAction<Partial<IDefaultResumeFilters>>,
    ) {
      state.resumes = { ...state.resumes, ...action.payload };
    },
    resetResumeFilters(state) {
      state.resumes = defaultResumeFilters;
    },
  },
});

export const filtersReducers = store.reducer;
export const filtersActions = store.actions;
export type PayloadTypes = PayloadType<typeof filtersActions>;
