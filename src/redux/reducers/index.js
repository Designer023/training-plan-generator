import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";

import trainingPlan from "./trainingPlan";
import ui from "./ui";

const initialState = {
  values: {
    startDistance: 21000,
    endDistance: 54000,
    planLength: 23
  }
};
export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer.plugin({
      userSpec: (state = initialState, action) => {
        return state;
      }
    }),
    ui,
    trainingPlan
  });
