"use client";
import { NewApplicationModal } from "@pages/Modals/NewApplicationModal";
import { uiActions } from "@store/reducers/ui";
import { uiSelector } from "@store/selectors/ui";
import { useDispatch, useSelector } from "react-redux";

export const NewApplicationModalRoot = () => {
  const data = useSelector(uiSelector.openNewApplicationModal);
  const dispatch = useDispatch();

  const onOpenChange = (status: boolean) => {
    dispatch(uiActions.setOpenNewApplicationModal(status));
  };

  return <NewApplicationModal open={data} onOpenChange={onOpenChange} />;
};
