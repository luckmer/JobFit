import { createSlice } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export type IResumseState = {};

export const resumeStore = "resumeStore";

export const defaultState: IResumseState = {};

export const store = createSlice({
  name: resumeStore,
  initialState: defaultState,
  reducers: {},
});

export const resumeReducers = store.reducer;
export const resumeActions = store.actions;
export type PayloadTypes = PayloadType<typeof resumeActions>;
