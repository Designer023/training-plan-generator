import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, H1 } from "@bootstrap-styled/v4";

import { WeekPlan, UserSpec } from "../types";

import WeekBlock from "../components/WeekBlock";
import * as tp from "../redux/reducers/trainingPlan";

import UserSpecForm from "../forms/UserSpecForm";

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
          return <WeekBlock week={week} key={week.week} />;
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
  return (
    <Container>
      <Row>
        <Col>
          <H1>Training plan</H1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="p-2 rounded border">
            <UserSpecForm handleSubmit={generatePlan} />
          </div>
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
