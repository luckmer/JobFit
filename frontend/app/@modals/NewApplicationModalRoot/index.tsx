"use client";
import { NewApplicationModal } from "@pages/Modals/NewApplicationModal";
import type { NewApplicationFormValues } from "@schemas/newApplicationSchema";
import { jobActions } from "@store/reducers/jobs";
import { uiActions } from "@store/reducers/ui";
import { uiSelector } from "@store/selectors/ui";
import { useDispatch, useSelector } from "react-redux";

export const NewApplicationModalRoot = () => {
  const data = useSelector(uiSelector.openNewApplicationModal);
  const dispatch = useDispatch();

  const onOpenChange = (status: boolean) => {
    dispatch(uiActions.setOpenNewApplicationModal(status));
  };

  const onSubmit = (data: NewApplicationFormValues) => {
    dispatch(jobActions.createJob(data));
  };

  return (
    <NewApplicationModal
      open={data}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    />
  );
};
