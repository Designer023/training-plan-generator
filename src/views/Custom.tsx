import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, H1, Alert } from "@bootstrap-styled/v4";

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
          return <WeekBlock week={week} key={week.number} />;
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
  console.log(plan);
  return (
    <Container>
      <Row>
        <Col>
          <H1 className="text-center mt-4 mb-3">Create your own plan</H1>
          <Alert className="mb-1" color="danger" uncontrolled>
            Undertake a training plan at your own risk. Consult your doctor if
            you are unsure. I am not a doctor or PT!
          </Alert>
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
