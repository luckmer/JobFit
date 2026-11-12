"use client";
import type { ColumnId } from "@interfaces/overview/types";
import { Overview } from "@pages/Overview";
import { jobActions } from "@store/reducers/jobs";
import { jobsSelector } from "@store/selectors/jobs";
import { useDispatch, useSelector } from "react-redux";

const OverviewRoot = () => {
  const jobs = useSelector(jobsSelector.jobs);
  const dispatch = useDispatch();

  const handleUpdateStage = (
    id: string,
    column: ColumnId,
    prevColumn: ColumnId,
  ) => {
    dispatch(jobActions.updateJobStage({ id, column, prevColumn }));
  };

  return <Overview jobs={jobs} handleUpdateStage={handleUpdateStage} />;
};

export default OverviewRoot;
