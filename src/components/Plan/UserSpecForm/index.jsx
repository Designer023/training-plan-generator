import React, { useState, useCallback } from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";

// import { connect, useSelector } from "react-redux";
import get from "lodash/get";
import set from "lodash/set";

const USER_CRITERIA = {
  PLAN_LENGTH: 23, // WEEKS
  PLAN_TAIL_OFF_LENGTH: 3,
  PLAN_RECOVER_WEEK_EVERY: 4,
  PLAN_START_DISTANCE: 21000, // m
  PLAN_END_DISTANCE: 54000, // m
  PLAN_START_DATE: new Date(2020, 0, 6).toISOString(),
  USER_MAX_HR: 185,
  USER_PACES: {
    // PACES in m per sec
    ENDURANCE: 3.194444,
    STAMINA: 6.0
  }
};

const DatePicker = () => {
  const [focused, setFocused] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <DateRangePicker
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }} // PropTypes.func.isRequired,
      focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => setFocused(focusedInput)} // PropTypes.func.isRequired,
    />
  );
};

let UserSpecForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const startDistance = useSelector(state =>
    get(state, "form.userSpec.values.startDistance", 21000)
  );
  const endDistance = useSelector(state =>
    get(state, "form.userSpec.values.endDistance", 50000)
  );
  const planLength = useSelector(state =>
    get(state, "form.userSpec.values.planLength", 24)
  );

  return (
    <form>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="startDistance">Start distance</label>
            <Field
              name="startDistance"
              component="input"
              type="number"
              placeholder="Start distance"
              className="form-control"
            />
            <small className="form-text text-dark">
              The distance you can currently run
            </small>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="endDistance">Start distance</label>
            <Field
              name="endDistance"
              component="input"
              type="number"
              placeholder="End distance"
              className="form-control"
            />
            <small className="form-text text-dark">
              The distance you want to run
            </small>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="planLength">Number of weeks</label>
            <Field
              name="planLength"
              component="input"
              type="number"
              placeholder="Plan Length"
              className="form-control"
            />
            <small className="form-text text-dark">
              The time to make gains!
            </small>
          </div>
        </div>
        <div className="col" />
      </div>

      <Field name="dates" component={DatePicker} />

      <hr />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={pristine || submitting}
        onClick={e => {
          e.preventDefault();
          let userSpec = set(
            USER_CRITERIA,
            "PLAN_START_DISTANCE",
            parseInt(startDistance)
          );
          userSpec = set(userSpec, "PLAN_END_DISTANCE", parseInt(endDistance));
          userSpec = set(userSpec, "PLAN_LENGTH", parseInt(planLength));
          handleSubmit(userSpec);
        }}
      >
        Update
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  // console.log(state.form.userSpec)
  return {
    //initialValues: state.form.userSpec
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // actions: bindActionCreators({ getAthleteData, getAthleteStats, getActivities }, dispatch)
  };
};

UserSpecForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSpecForm);

const UserSpecReduxForm = reduxForm({
  // a unique name for the form
  form: "userSpec",
  enableReinitialize: true
})(UserSpecForm);

export default UserSpecReduxForm;
