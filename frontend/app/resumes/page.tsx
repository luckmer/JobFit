"use client";

import MyResumes from "@pages/Resumes";
import { resumeSelector } from "@store/selectors/resume";
import { useSelector } from "react-redux";

const MyResumesRoot = () => {
  const resumes = useSelector(resumeSelector.resumes);

  return <MyResumes resumes={resumes} />;
};

export default MyResumesRoot;
