import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
// import DataTable from "react-data-table-component";
import { Container, Row, Col, H1, Alert } from "@bootstrap-styled/v4";

import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import queryString from "query-string";

import moment from "moment";

import { WeekPlan, UserSpec } from "./trainingPlanGenerator/types";

import * as tp from "../../redux/reducers/trainingPlan";

import WeekBlock from "./trainingPlanGenerator/Components/WeekBlock";

// Hook
const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
};

interface PlanRenderPropsType {
  plan: WeekPlan[];
  generatePlan(spec: UserSpec): void;
}

const PlanRender = ({ plan }: PlanRenderPropsType) => {
  if (!plan) return null;

  return (
    <Row className="mt-4">
      <Col>
        {plan.map((week) => {
          return <WeekBlock week={week} key={`week_${week.week}`} />;
        })}
      </Col>
    </Row>
  );
};

interface PlanTypes {
  plan: WeekPlan[];
  generatePlan(spec: UserSpec): void;
}

const Plan = ({ plan, generatePlan }: PlanTypes) => {
  const router = useRouter();

  console.log(router);

  useEffect(() => {
    generatePlan({
      PLAN_LENGTH: 12, // WEEKS
      PLAN_TAIL_OFF_LENGTH: 2,
      PLAN_RECOVER_WEEK_EVERY: 4,
      PLAN_START_DISTANCE: 10000,
      PLAN_END_DISTANCE: 42600, // m
      PLAN_START_DATE: moment()
        .startOf("isoWeek")
        .format(),
      USER_MAX_HR: 175,
      USER_PACES: {
        // PACES in m per sec
        ENDURANCE: 3.194444,
        STAMINA: 6.0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <H1 className="text-center mt-4 mb-3">Training plan</H1>
          <Alert className="mb-1" color="danger" uncontrolled>
            Undertake training plan at your own risk. Consult your doctor if you
            are unsure. I am not a doctor or PT!
          </Alert>
        </Col>
      </Row>
      <PlanRender plan={plan} generatePlan={generatePlan} />
    </Container>
  );
};

export default connect(
  (state) => ({
    plan: tp.getPlan(state),
  }),
  {
    generatePlan: tp.generatePlan,
  }
)(Plan);
