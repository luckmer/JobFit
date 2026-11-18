import type { ColumnId } from "@interfaces/overview/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export const uiStore = "uiStore";

export type IOpenStageModal = {
  company: string;
  jobID: string;
  status: boolean;
  stage: ColumnId;
  prevStage: ColumnId;
};

export type IUiState = {
  openStageModal: IOpenStageModal;
  openNewApplicationModal: boolean;
  openResumeModal: boolean;
};

export const defaultState: IUiState = {
  openStageModal: {
    company: "",
    jobID: "-1",
    status: false,
    stage: "new",
    prevStage: "new",
  },
  openNewApplicationModal: false,
  openResumeModal: false,
};

export const store = createSlice({
  name: uiStore,
  initialState: defaultState,
  reducers: {
    setOpenStageModal(state, action: PayloadAction<IOpenStageModal>) {
      state.openStageModal = action.payload;
      return state;
    },
    setOpenNewApplicationModal(state, action: PayloadAction<boolean>) {
      state.openNewApplicationModal = action.payload;
    },

    setOpenResumeModal(state, action: PayloadAction<boolean>) {
      state.openResumeModal = action.payload;
    },
  },
});

export const uiReducers = store.reducer;
export const uiActions = store.actions;
export type PayloadTypes = PayloadType<typeof uiActions>;
