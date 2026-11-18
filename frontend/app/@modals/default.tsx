import { NewApplicationModalRoot } from "./NewApplicationModalRoot";
import ResumeModalRoot from "./ResumeModalRoot";
import { StageModalRoot } from "./StageModalRoot";

const ModalsRoot = () => {
  return (
    <>
      <ResumeModalRoot />
      <StageModalRoot />
      <NewApplicationModalRoot />
    </>
  );
};

export default ModalsRoot;
