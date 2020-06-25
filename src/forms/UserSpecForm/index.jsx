import React from "react";
import { Field, reduxForm } from "redux-form";
import { useTranslation } from "react-i18next";

import {
  Alert,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
  Button
} from "@bootstrap-styled/v4";

import moment from "moment";

import DatePicker from "../fields/date-picker";
import Input from "../fields/input";
import Select from "../fields/select";

import { DISTANCES } from "../../constants";
import { required, maxWeeks52, minWeeks6 } from "../validators";
import {
  useUserCriteria,
  useDaysIntoPlan,
  useStartDateFormatted
} from "../../hooks";

const FormColumnGroup = ({ children }) => (
  <Col xs="12" sm="12" md="6" lg="3">
    <FormGroup>{children}</FormGroup>
  </Col>
);

const UserSpecForm = props => {
  const {
    handleSubmit,
    valid,
    error,
    // reset,
    submitting,
    synchronousError
  } = props;

  const { t } = useTranslation();

  const userCriteria = useUserCriteria();
  const daysIntoPlan = useDaysIntoPlan();
  const startDateFormatted = useStartDateFormatted();

  return (
    <Row>
      <Col>
        <Form className="bg-light p-2">
          <Row>
            <FormColumnGroup>
              <Label htmlFor="startDistance">{t("form.endDate")}</Label>
              <Row>
                <Col>
                  <Field
                    name="endDate"
                    component={DatePicker}
                    className="form-control"
                  />
                </Col>
              </Row>

              <FormText className="text-muted">
                This is the date when your event will happen
              </FormText>
            </FormColumnGroup>
            <FormColumnGroup>
              <Field
                name="planLength"
                component={Input}
                type="number"
                placeholder="Plan Length"
                className="form-control"
                validate={[required, minWeeks6, maxWeeks52]}
                label={t("form.planLength")}
              />
              <FormText className="text-muted">
                The number of weeks the plan is running for
              </FormText>
            </FormColumnGroup>

            <FormColumnGroup>
              <Field
                name="startDistance"
                component={Select}
                options={DISTANCES}
                validate={[required]}
                label={t("form.startDistance.label")}
                helper={t("form.startDistance.helper")}
              />
            </FormColumnGroup>
            <FormColumnGroup>
              <Field
                name="endDistance"
                component={Select}
                options={DISTANCES}
                validate={[required]}
                label={t("form.targetDistance.label")}
                helper={t("form.targetDistance.helper")}
              />
            </FormColumnGroup>
          </Row>
          <hr />

          <Row>
            <FormColumnGroup>
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
            </FormColumnGroup>

            <FormColumnGroup>
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
            </FormColumnGroup>
          </Row>
          <hr />

          <Row>
            <FormColumnGroup>
              <Field
                name="maxHR"
                component={Input}
                type="number"
                placeholder={t("form.maxHR.placeholder")}
                className="form-control"
                validate={[required]}
                label={t("form.maxHR.label")}
              />
              <small className="form-text text-muted">
                {t("form.maxHR.helper")}
              </small>
            </FormColumnGroup>
          </Row>

          <hr />

          {synchronousError && <strong>{synchronousError}</strong>}
          {error && <strong>{error}</strong>}

          <Alert color={`${daysIntoPlan >= 0 ? "info" : "warning"}`}>
            {daysIntoPlan >= 0
              ? "Your plan will start on "
              : "Your plan has already started on "}{" "}
            {startDateFormatted}
          </Alert>

          <Button
            color="primary"
            className="btn btn-dark text-light text-uppercase font-weight-bold"
            type="submit"
            disabled={!valid || error || submitting}
            onClick={e => {
              e.preventDefault();
              handleSubmit(userCriteria);
            }}
          >
            Create plan
          </Button>
        </Form>
      </Col>
    </Row>
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
