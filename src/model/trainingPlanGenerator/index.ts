import { ProgressType, UserSpec } from "../../types";
import Progress from "./progress";

const createPlan = (spec: UserSpec) => {
  const progress: ProgressType = new Progress(
    spec,
    spec.PLAN_START_DISTANCE,
    spec.PLAN_END_DISTANCE,
    spec.PLAN_LENGTH,
    spec.PLAN_TAIL_OFF_LENGTH
  );
  return progress.createPlan();
};

export default createPlan;
