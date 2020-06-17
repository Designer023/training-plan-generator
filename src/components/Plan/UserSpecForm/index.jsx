import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import set from "lodash/set";
import moment from "moment";

import DatePicker from "./fields/date-picker";
import Input from "./fields/input";
import Select from "./fields/select";

import { DISTANCES } from "../../../constants";
import { required, maxWeeks52, minWeeks6 } from "../../../validators";

const USER_CRITERIA = {
  PLAN_LENGTH: 23, // WEEKS
  PLAN_TAIL_OFF_LENGTH: 3,
  PLAN_RECOVER_WEEK_EVERY: 4,
  PLAN_START_DISTANCE: DISTANCES[0].value,
  PLAN_END_DISTANCE: DISTANCES[5].value, // m
  PLAN_START_DATE: new Date(2020, 0, 6).toISOString(),
  USER_MAX_HR: 185,
  USER_PACES: {
    // PACES in m per sec
    ENDURANCE: 3.194444,
    STAMINA: 6.0
  }
};

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
    get(state, "form.userSpec.values.startDistance")
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

  const taperLength = useSelector(state =>
    get(state, "form.userSpec.values.taperLength")
  );

  const recoveryPeriod = useSelector(state =>
    get(state, "form.userSpec.values.recoveryPeriod")
  );

  const maxHR = useSelector(state => get(state, "form.userSpec.values.maxHR"));

  const startDate = moment(planEndDate)
    .subtract(planLength, "week")
    .startOf("isoWeek");
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
            component={Input}
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
          <Field
            name="startDistance"
            component={Select}
            options={DISTANCES}
            validate={[required]}
            label={t("form.startDistance.label")}
            helper={t("form.startDistance.helper")}
          />
        </div>

        <div className="col col-md-6">
          <Field
            name="endDistance"
            component={Select}
            options={DISTANCES}
            validate={[required]}
            label={t("form.targetDistance.label")}
            helper={t("form.targetDistance.helper")}
          />
        </div>
      </div>
      <hr />

      <div className="form-row">
        <div className="col col-md-6">
          <Field
            name="taperLength"
            component={Select}
            options={[
              { display: "1 Week", value: 1 },
              { display: "2 Weeks", value: 2 },
              { display: "3 Weeks", value: 3 }
            ]}
            validate={[required]}
            label={t("form.taperLength.label")}
            helper={t("form.taperLength.helper")}
          />
        </div>

        <div className="col col-md-6">
          <Field
            name="recoveryPeriod"
            component={Select}
            options={[
              { display: "4 Weeks", value: 4 },
              { display: "6 Weeks", value: 6 },
              { display: "8 Weeks", value: 8 }
            ]}
            validate={[required]}
            label={t("form.recoveryPeriod.label")}
            helper={t("form.recoveryPeriod.helper")}
          />
        </div>
      </div>
      <hr />

      <div className="form-row">
        <div className="col">
          <Field
            name="maxHR"
            component={Input}
            type="number"
            placeholder={t("form.maxHR.placeholder")}
            className="form-control"
            validate={[required]}
            label={t("form.maxHR.label")}
          />
          <small className="form-text text-dark">
            {t("form.maxHR.helper")}
          </small>
        </div>
        {/* </div>
         <div className="col">
          <Field
            name="maxHR"
            component={Input}
            type="number"
            placeholder="Plan Length"
            className="form-control"
            validate={[required]}
            label={t("form.planLength")}
          />
          <small className="form-text text-dark">
            The number of weeks the plan is running for
          </small>
        </div> */}
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
            : "Your plan has already started on "}{" "}
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

          userSpec = set(
            userSpec,
            "PLAN_TAIL_OFF_LENGTH",
            parseInt(taperLength)
          );

          userSpec = set(
            userSpec,
            "PLAN_RECOVER_WEEK_EVERY",
            parseInt(recoveryPeriod)
          );

          userSpec = set(userSpec, "USER_MAX_HR", parseInt(maxHR));

          handleSubmit(userSpec);
        }}
      >
        Create plan
      </button>
    </form>
  );
};

const UserSpecReduxForm = reduxForm({
  // a unique name for the form
  form: "userSpec",
  enableReinitialize: true,
  initialValues: {
    startDistance: DISTANCES[3].value, // 5km
    endDistance: DISTANCES[5].value, // HM
    endDate: moment()
      .endOf("week")
      .add(12, "week"),
    planLength: 12,
    taperLength: 1,
    recoveryPeriod: 4,
    maxHR: 175
  }
})(UserSpecForm);

export default UserSpecReduxForm;
