"use client";

import MyResumes from "@pages/Resumes";
import { filtersActions } from "@store/reducers/filters";
import { uiActions } from "@store/reducers/ui";
import { filtersSelector } from "@store/selectors/filters";
import { resumeSelector } from "@store/selectors/resume";
import { useDispatch, useSelector } from "react-redux";

const MyResumesRoot = () => {
  const resumesFilter = useSelector(filtersSelector.resumes);
  const resumes = useSelector(resumeSelector.resumes);
  const isLoadingResumes = useSelector(resumeSelector.isLoadingResumes);
  const dispatch = useDispatch();

  const setFilter = (key: string, value: string) => {
    dispatch(filtersActions.setResumeFilters({ [key]: value }));
  };

  const onClickResetFilters = () => {
    dispatch(filtersActions.resetResumeFilters());
  };

  return (
    <MyResumes
      category={resumesFilter.category}
      resumes={resumes}
      search={resumesFilter.search}
      sort={resumesFilter.sort}
      onClickResetFilters={onClickResetFilters}
      setFilter={setFilter}
      isLoadingResumes={isLoadingResumes}
      onClickAddResume={() => {
        dispatch(uiActions.setOpenResumeModal(true));
      }}
    />
  );
};

export default MyResumesRoot;
