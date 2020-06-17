import { useSelector } from "react-redux";
import get from "lodash/get";
import set from "lodash/set";
import moment from "moment";

const useStartDistance = () => {
  return useSelector(state => get(state, "form.userSpec.values.startDistance"));
};

const useEndDistance = () => {
  return useSelector(state => get(state, "form.userSpec.values.endDistance"));
};

const usePlanLength = () => {
  return useSelector(state => get(state, "form.userSpec.values.planLength"));
};

const useEndDate = () => {
  return useSelector(state => get(state, "form.userSpec.values.endDate"));
};

const useTaperLength = () => {
  return useSelector(state => get(state, "form.userSpec.values.taperLength"));
};

const useRecoveryPeriod = () => {
  return useSelector(state =>
    get(state, "form.userSpec.values.recoveryPeriod")
  );
};

const useMaxHR = () => {
  return useSelector(state => get(state, "form.userSpec.values.maxHR"));
};

const useStartDate = () => {
  const planEndDate = useEndDate();
  const planLength = usePlanLength();
  return moment(planEndDate)
    .subtract(planLength, "week")
    .startOf("isoWeek");
};

export const useUserCriteria = () => {
  const startDistance = useStartDistance();
  const endDistance = useEndDistance();
  const planLength = usePlanLength();
  const taperLength = useTaperLength();
  const recoveryPeriod = useRecoveryPeriod();
  const maxHR = useMaxHR();
  const startDate = useStartDate();

  let userSpec = {
    PLAN_LENGTH: planLength, // WEEKS
    PLAN_TAIL_OFF_LENGTH: taperLength,
    PLAN_RECOVER_WEEK_EVERY: recoveryPeriod,
    PLAN_START_DISTANCE: startDistance,
    PLAN_END_DISTANCE: endDistance, // m
    PLAN_START_DATE: startDate,
    USER_MAX_HR: maxHR,
    USER_PACES: {
      // PACES in m per sec
      ENDURANCE: 3.194444,
      STAMINA: 6.0
    }
  };
  userSpec = set(userSpec, "PLAN_START_DISTANCE", parseInt(startDistance));
  userSpec = set(userSpec, "PLAN_END_DISTANCE", parseInt(endDistance));
  userSpec = set(userSpec, "PLAN_LENGTH", parseInt(planLength));
  userSpec = set(userSpec, "PLAN_START_DATE", startDate.toISOString());

  userSpec = set(userSpec, "PLAN_TAIL_OFF_LENGTH", parseInt(taperLength));

  userSpec = set(userSpec, "PLAN_RECOVER_WEEK_EVERY", parseInt(recoveryPeriod));

  return set(userSpec, "USER_MAX_HR", parseInt(maxHR));
};

export const useStartDateFormatted = () => {
  const planEndDate = useEndDate();
  const planLength = usePlanLength();

  return moment(planEndDate)
    .subtract(planLength, "week")
    .startOf("isoWeek")
    .format("MMM D YYYY");
};

export const useDaysIntoPlan = () => {
  const planEndDate = useEndDate();
  const planLength = usePlanLength();

  return moment(planEndDate)
    .subtract(planLength, "week")
    .startOf("isoWeek")
    .diff(moment().startOf("day"), "days");
};
