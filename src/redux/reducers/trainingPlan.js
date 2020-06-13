import { createActions, handleAction } from "redux-actions";
import createPlan from "../../components/Plan/trainingPlanGenerator";
import get from "lodash/get";

const defaultState = {
  plan: null
};

export const { generatePlan } = createActions({
  GENERATE_PLAN: spec => {
    return createPlan(spec);
  }
});

const reducer = handleAction(
  "GENERATE_PLAN",
  (state, action) => ({
    plan: action.payload
  }),
  defaultState
);

export const getPlan = state => {
  // Gets the training plan
  return get(state, "trainingPlan.plan", null);
};

export default reducer;
