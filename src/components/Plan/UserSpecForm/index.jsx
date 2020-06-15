import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import set from "lodash/set";
import moment from "moment";

import DatePicker from "./date-picker";

const DISTANCES = [
  {
    display: "5km",
    value: 5000
  },
  {
    display: "10km",
    value: 10000
  },
  {
    display: "15km",
    value: 15000
  },
  {
    display: "20km",
    value: 20000
  },
  {
    display: "Half Marathon",
    value: 21097.5
  },
  {
    display: "Metric Marathon (26.2km)",
    value: 262000
  },
  {
    display: "30km",
    value: 30000
  },
  {
    display: "Marathon",
    value: 42195
  },
  {
    display: "Ultra - 50km",
    value: 50000
  },
  {
    display: "Ultra - 60km",
    value: 60000
  },
  {
    display: "Ultra - 50mi",
    value: 80467.2
  },
  {
    display: "Ultra - 100km",
    value: 100000
  },
  {
    display: "Ultra - 80mi",
    value: 128748
  },
  {
    display: "Ultra - 100mi",
    value: 160934
  }
];

const USER_CRITERIA = {
  PLAN_LENGTH: 23, // WEEKS
  PLAN_TAIL_OFF_LENGTH: 3,
  PLAN_RECOVER_WEEK_EVERY: 4,
  PLAN_START_DISTANCE: 5000,
  PLAN_END_DISTANCE: DISTANCES[0].value, // m
  PLAN_START_DATE: new Date(2020, 0, 6).toISOString(),
  USER_MAX_HR: 185,
  USER_PACES: {
    // PACES in m per sec
    ENDURANCE: 3.194444,
    STAMINA: 6.0
  }
};

const required = value => (value ? undefined : "Required");
const minWeeks6 = value =>
  value < 6 ? "Your plan must be longer than 6 weeks" : undefined;
const maxWeeks52 = value =>
  value > 52 ? "Your plan must be shorter than a year!" : undefined;

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="">{label}</label>
    <input
      className="form-control"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched && error && <div className="alert alert-danger mt-1">{error}</div>}
  </div>
);

let UserSpecForm = props => {
  const {
    handleSubmit,
    pristine,
    valid,
    error,
    reset,
    submitting,
    synchronousError
  } = props;

  const { t, i18n } = useTranslation();

  const startDistance = useSelector(state =>
    get(state, "form.userSpec.values.startDistance", 21000)
  );
  const endDistance = useSelector(state =>
    get(state, "form.userSpec.values.endDistance")
  );
  const planLength = useSelector(state =>
    get(state, "form.userSpec.values.planLength")
  );

  const planEndDate = useSelector(state =>
    get(state, "form.userSpec.values.endDate", null)
  );

  const startDate = moment(planEndDate)
    .startOf("week")
    .subtract(planLength, "week");
  const startDateFormatted = startDate.format("MMM D YYYY");
  const daysIntoPlan = startDate.diff(moment().startOf("day"), "days");

  return (
    <form>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="startDistance">{t("form.endDate")}</label>
            <div className="row">
              <div className="col">
                <Field
                  name="endDate"
                  component={DatePicker}
                  className="form-control"
                />
              </div>
            </div>

            <small className="form-text text-dark">
              This is the date when your event will happen
            </small>
          </div>
        </div>
        <div className="col">
          <Field
            name="planLength"
            component={renderField}
            type="number"
            placeholder="Plan Length"
            className="form-control"
            validate={[required, minWeeks6, maxWeeks52]}
            label={t("form.planLength")}
          />
          <small className="form-text text-dark">
            The number of weeks the plan is running for
          </small>
        </div>
      </div>

      <hr />
      <div className="form-row">
        <div className="col col-md-6">
          <div className="form-group">
            <label htmlFor="endDistance">
              {t("form.targetDistance.label", "Target distance")}
            </label>
            <Field
              name="endDistance"
              component="select"
              className="form-control"
            >
              {DISTANCES.map(d => {
                return (
                  <option key={d.value} value={d.value}>
                    {d.display}
                  </option>
                );
              })}
            </Field>
            <small className="form-text text-dark">
              {t("form.targetDistance.helper")}
            </small>
          </div>
        </div>
      </div>

      <hr />

      {synchronousError && <strong>{synchronousError}</strong>}
      {error && <strong>{error}</strong>}

      {startDate ? (
        <div
          className={`alert alert-${daysIntoPlan >= 0 ? "info" : "warning"}`}
          role="alert"
        >
          {daysIntoPlan >= 0
            ? "Your plan will start on "
            : "The plan will start in the past: "}{" "}
          {startDateFormatted}
        </div>
      ) : null}

      <button
        className="btn btn-primary"
        type="submit"
        disabled={!valid || error || submitting}
        onClick={e => {
          e.preventDefault();

          let userSpec = USER_CRITERIA;
          userSpec = set(
            userSpec,
            "PLAN_START_DISTANCE",
            parseInt(startDistance)
          );
          userSpec = set(userSpec, "PLAN_END_DISTANCE", parseInt(endDistance));
          userSpec = set(userSpec, "PLAN_LENGTH", parseInt(planLength));

          userSpec = set(userSpec, "PLAN_START_DATE", startDate.toISOString());

          handleSubmit(userSpec);
        }}
      >
        Create plan
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
  enableReinitialize: true,
  initialValues: {
    endDistance: 21097.5,
    endDate: moment()
      .endOf("week")
      .add(12, "week"),
    planLength: 12
  }
})(UserSpecForm);

export default UserSpecReduxForm;
