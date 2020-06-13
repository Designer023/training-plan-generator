import { useSelector, useDispatch } from "react-redux";

import get from "lodash/get";
import { setDisplayStyle } from "../../../redux/reducers/ui";

export const useDisplayStyle = () => {
  const displayStyle = useSelector(state => {
    return get(state, "ui.displayStyle", null);
  });
  const dispatch = useDispatch();

  const setDisplay = value => dispatch(setDisplayStyle(value));

  return {
    displayStyle,
    setDisplay
  };
};
