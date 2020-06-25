import React from "react";
import { Row, Col, Badge, H5, H4, H6, Hr, P } from "@bootstrap-styled/v4";

import get from "lodash/get";
// import moment from "moment";

import { WeekPlan } from "../../../trainingPlanGenerator/types";

import DayBlock from "../DayBlock";

const getTheme = (name: string | undefined): string => {
  if (!name) return "primary";

  const options: Record<string, string> = {
    rest: "success",
    hit: "warning",
    easy: "success",
    parkrun: "success",
    base: "info",
    long: "danger",
    "long+": "danger",
    "long-": "danger",
    "2x": "danger",
    "1/2": "danger",
    "2/2": "danger",
    taper: "primary",
    special: "danger",
    race: "warning",
    recovery: "success",
  };
  return options[name] || "primary";
};

const weekBio = (category: string) => {
  switch (category) {
    case "regular":
      return "Just a week of running, with a long run on the last day";
    case "special":
      return "Extra running just for you!";
    case "recovery":
      return "A little less to help you catch up!";
    case "taper":
      return "Less is more. The race is the more!";
    case "race":
      return "This is the week. You can do it 🙌";
    default:
      return "Just run!";
  }
};

type WeekProps = {
  week: WeekPlan;
};

const WeekBlock = (props: WeekProps) => {
  const { week } = props;

  let runningTime = 0;
  let runningDistance = 0;

  week.days.forEach((day) => {
    runningTime += get(day, "primaryActivity.details.details.spec.duration", 0);
    runningDistance += get(
      day,
      "primaryActivity.details.details.spec.approx_distance",
      0
    );
  });

  return (
    <>
      <Row className={`pb-4 bg-${getTheme(week.focus)} mt-md-4`} />
      <Row className="bg-dark text-light">
        <Col xs={12} md={3} className="py-2">
          <H5 className="mt-2">
            <Badge className="text-uppercase" color={getTheme(week.focus)}>
              {week.focus}
            </Badge>
          </H5>
          <H4>Week {week.week}</H4>
          <H6 className={`text-uppercase text-${getTheme(week.focus)}`}>
            {week.startDate.format("Do MMM 'YY")}
          </H6>
          <P>
            {Math.round(runningTime / 60)} mins / ~
            {Math.round(runningDistance / 1000)} km
          </P>
          <Hr />
          <P>{weekBio(week.focus)}</P>
        </Col>
        <Col xs={12} md={9} className="bg-light text-dark border-right">
          {week.days.map((day) => (
            <DayBlock day={day} key={day.day.date.format()} />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default WeekBlock;
