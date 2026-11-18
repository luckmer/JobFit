"use client";
import ResumeModal from "@pages/Modals/ResumeModal";
import { resumeActions } from "@store/reducers/resume";
import { uiActions } from "@store/reducers/ui";
import { uiSelector } from "@store/selectors/ui";
import { useDispatch, useSelector } from "react-redux";

const ResumeModalRoot = () => {
  const open = useSelector(uiSelector.openResumeModal);
  const dispatch = useDispatch();

  const onOpenChange = (status: boolean) => {
    dispatch(uiActions.setOpenResumeModal(status));
  };

  return (
    <ResumeModal
      open={open}
      onOpenChange={onOpenChange}
      onClickSubmit={(formData) => {
        dispatch(uiActions.setOpenResumeModal(false));
        dispatch(resumeActions.createResume(formData));
      }}
    />
  );
};

export default ResumeModalRoot;
