"use client";

import MyResumes from "@pages/Resumes";
import { uiActions } from "@store/reducers/ui";
import { resumeSelector } from "@store/selectors/resume";
import { useDispatch, useSelector } from "react-redux";

const MyResumesRoot = () => {
  const resumes = useSelector(resumeSelector.resumes);
  const isLoadingResumes = useSelector(resumeSelector.isLoadingResumes);
  const dispatch = useDispatch();

  return (
    <MyResumes
      resumes={resumes}
      isLoadingResumes={isLoadingResumes}
      onClickAddResume={() => {
        dispatch(uiActions.setOpenResumeModal(true));
      }}
    />
  );
};

export default MyResumesRoot;
