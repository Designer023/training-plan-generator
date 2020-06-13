import React, { Fragment, useState } from "react";
import moment from "moment";
import { roundUp } from "../trainingPlanGenerator/utils";

export const Content = ({ children }) => {
  return <div className="col-12  col-sm-6 col-xl-12">{children}</div>;
};

export const Title = ({ text }) => (
  <div className="col-12 col-sm-6 col-xl-12">
    <h3>{text}</h3>
  </div>
);

export const Header = ({ children }) => (
  <div className="col-12">
    <div>{children}</div>
    <hr />
  </div>
);

export const BMPRange = ({ min, max, extraCSS = "" }) => (
  <span className={`badge badge-pill badge-dark pulse ml-3 ${extraCSS}`}>
    HR: {min}-{max}
  </span>
);

export const extraTheme = type => {
  switch (type) {
    case "hit":
      return "warning";
    case "flex":
      return "success";
    case "cross":
      return "info";
    default:
      return "light";
  }
};

export const ExtraActivity = ({ activity }) => {
  const [toggled, toggle] = useState(false);
  return (
    <Fragment>
      {activity ? (
        <div
          className={`rounded mt-2 rounded bg-${extraTheme(activity.type)} `}
        >
          <h5
            className="h6 text-center text-light my-1"
            onClick={() => toggle(!toggled)}
          >
            {activity.category}
          </h5>

          {toggled && activity.activity ? (
            <ul className="text-light">
              {activity.activity.routine.map(r => (
                <li key={r}>{r.text || r}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export const RunTable = ({ spec }) => {
  if (!spec) return null;

  const durationHuman = moment(new Date())
    .startOf("day")
    .seconds(roundUp(spec.duration, 300))
    .format("H:mm:ss");
  const distance = Math.round(spec.approx_distance / 1000);
  return (
    <table className="table rounded border table-striped">
      <tbody>
        <tr>
          <th>Time</th>
          <td>{durationHuman}</td>
        </tr>

        <tr>
          <th>Distance</th>
          <td>~{distance} km</td>
        </tr>
      </tbody>
    </table>
  );
};

export const EffortTable = ({ effort }) => {
  if (!effort) return null;

  return (
    <table className="table border table-striped table-sm">
      <tbody>
        <tr>
          <th>Pace</th>
          <td>{effort.name}</td>
        </tr>

        <tr>
          <th>RPE</th>
          <td>
            {effort.rpe.min}-{effort.rpe.max}
          </td>
        </tr>
        <tr>
          <th>HR-Zone</th>
          <td>
            {effort.hrp.min}-{effort.hrp.max}%
          </td>
        </tr>
        <tr>
          <th>HR-range</th>
          <td>
            {effort.hr.min}-{effort.hr.max}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
