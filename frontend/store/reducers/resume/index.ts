import type { Resume } from "@interfaces/resume/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "@store/helper";

export const resumeStore = "resumeStore";

export type IResumseState = {
  resumes: Resume[];
  resumeNextCursor: string | null;
  isLoadingResumes: boolean;
};

export const defaultState: IResumseState = {
  resumes: [],
  resumeNextCursor: null,
  isLoadingResumes: true,
};

export const store = createSlice({
  name: resumeStore,
  initialState: defaultState,
  reducers: {
    fetchResumes(state) {
      return state;
    },

    setResumes(
      state,
      action: PayloadAction<{
        resumes: Resume[];
        nextCursor: string | null;
        isLoadingResumes: boolean;
      }>,
    ) {
      state.resumes = action.payload.resumes;
      state.resumeNextCursor = action.payload.nextCursor;
      state.isLoadingResumes = action.payload.isLoadingResumes;
      return state;
    },
    createResume(state, _: PayloadAction<FormData>) {
      return state;
    },
    setResume(state, resume: PayloadAction<Resume>) {
      state.resumes.push(resume.payload);
      return state;
    },

    removeDefaultResume(state, action: PayloadAction<string>) {
      state.resumes = state.resumes.filter(
        (resume) => resume.default_id !== action.payload,
      );
      return state;
    },
    removeResume(state, action: PayloadAction<number>) {
      state.resumes = state.resumes.filter(
        (resume) => resume.id !== action.payload,
      );
      return state;
    },
  },
});

export const resumeReducers = store.reducer;
export const resumeActions = store.actions;
export type PayloadTypes = PayloadType<typeof resumeActions>;
