import { createActions, handleAction } from "redux-actions";

const defaultState = {
  displayStyle: "compact"
};

export const { setDisplayStyle } = createActions({
  SET_DISPLAY_STYLE: style => {
    return style;
  }
});

const reducer = handleAction(
  "SET_DISPLAY_STYLE",
  (state, action) => ({
    displayStyle: action.payload
  }),
  defaultState
);

export default reducer;
