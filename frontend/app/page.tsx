"use client";
import { FLOATING_TOOLBAR_KEYS } from "@interfaces/constants/enums";
import type { ColumnId } from "@interfaces/overview/types";
import { Overview } from "@pages/Overview";
import { jobActions } from "@store/reducers/jobs";
import { uiActions } from "@store/reducers/ui";
import { jobsSelector } from "@store/selectors/jobs";
import { useDispatch, useSelector } from "react-redux";

const OverviewRoot = () => {
  const jobs = useSelector(jobsSelector.jobs);
  const isLoadingJobs = useSelector(jobsSelector.isLoadingJobs);

  const dispatch = useDispatch();

  const handleUpdateStage = (
    id: string,
    column: ColumnId,
    company: string,
    prevColumn: ColumnId,
  ) => {
    if (column === prevColumn) {
      return;
    }

    dispatch(
      uiActions.setOpenStageModal({
        company,
        status: true,
        stage: column,
        prevStage: prevColumn,
        jobID: id,
      }),
    );
  };

  const onClickAddApplicationAction = () => {
    dispatch(uiActions.setOpenNewApplicationModal(true));
  };

  const onClickReloadBoardAction = () => {
    dispatch(jobActions.clearJobs());
    dispatch(jobActions.fetchJobs());
  };

  return (
    <Overview
      jobs={jobs}
      isLoadingJobs={isLoadingJobs}
      handleUpdateStage={handleUpdateStage}
      onClickToolbarAction={(key) => {
        switch (key) {
          case FLOATING_TOOLBAR_KEYS.ADD: {
            onClickAddApplicationAction();
            break;
          }
          case FLOATING_TOOLBAR_KEYS.RELOAD: {
            onClickReloadBoardAction();
            break;
          }
        }
      }}
    />
  );
};

export default OverviewRoot;
