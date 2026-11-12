"use client";
import { StageModal } from "@pages/Modals/StageModal";
import { jobActions } from "@store/reducers/jobs";
import { uiActions } from "@store/reducers/ui";
import { uiSelector } from "@store/selectors/ui";
import { useDispatch, useSelector } from "react-redux";

export const StageModalRoot = () => {
  const data = useSelector(uiSelector.openStageModal);
  const dispatch = useDispatch();

  const onClickApply = (date: string) => {
    dispatch(
      jobActions.updateJobStage({
        prevColumn: data.prevStage,
        column: data.stage,
        id: data.jobID,
        date,
      }),
    );
  };

  const onOpenChange = (status: boolean) => {
    dispatch(
      uiActions.setOpenStageModal({
        prevStage: data.prevStage,
        company: data.company,
        stage: data.stage,
        jobID: data.jobID,
        status,
      }),
    );
  };

  const onClickCancel = () => {
    onOpenChange(false);
  };

  return (
    <StageModal
      stage={data.stage}
      company={data.company}
      open={data.status}
      onClickApply={onClickApply}
      onClickCancel={onClickCancel}
      onOpenChange={onOpenChange}
    />
  );
};

export default StageModal;
