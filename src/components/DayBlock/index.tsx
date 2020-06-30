import React from "react";
import { Row, Col, Badge, H5, H6, P } from "@bootstrap-styled/v4";

import get from "lodash/get";
import moment from "moment";

import { DayPlan } from "../../types";
import { roundUp } from "../../utils/rounding";

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

type DayProps = {
  day: DayPlan;
};
const DayBlock = (props: DayProps) => {
  const { day } = props;

  const today = moment();

  const isToday = today.isSame(day.date, "day");

  return (
    <Row className="border-bottom">
      <Col xs={11} sm={11} className="py-2">
        <H5>
          <Badge
            className="text-uppercase"
            color={getTheme(get(day, "category", ""))}
          >
            {get(day, "category", "")}
          </Badge>{" "}
          {get(day, "title", "-")}
        </H5>

        <H6 className="text-muted text-uppercase">
          {day.date.format("Do MMM 'YY")}
        </H6>
      </Col>
      <Col xs={1}>{isToday ? <>✅</> : null}</Col>
      <Col xs={12} sm={12} className="py-2">
        <H6>
          {day.time ? `${roundUp(day.time / 60, 5)} mins @ ` : null}
          {day.effortClass ? `${day.effortClass} pace` : null}
          <span className="text-muted">
            {day.distance ? ` (~ ${Math.round(day.distance / 1000)} km)` : null}
          </span>
        </H6>
        <P>{day.description}</P>
      </Col>
    </Row>
  );
};

export default DayBlock;
