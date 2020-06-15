import React, { useEffect } from "react";
import { connect } from "react-redux";

import { WeekPlan, UserSpec } from "./trainingPlanGenerator/types";

import * as tp from "../../redux/reducers/trainingPlan";

import { roundUp } from "./trainingPlanGenerator/utils";

import "./trainingPlanGenerator/styles/generator.css";
import { EffortTable, RunTable } from "./components";
import get from "lodash/get";
import moment from "moment";

import UserSpecForm from "./UserSpecForm";

import {useDisplayStyle} from "./hooks";

const getTheme = (name:string | undefined): string => {

    if (!name) return "primary";

    const options: Record<string, string> = {
        rest: "secondary",
        hit: "warning",
        easy: "secondary",
        parkrun: "success",
        base: "info",
        long: "danger",
        "long+": "danger",
        "long-": "danger",
        "2x": "danger",
        "1/2": "danger",
        "2/2": "danger",
        taper: "primary"
    };
    return options[name] || "primary";
};

interface PlanRenderPropsType {
    plan: WeekPlan[],
    generatePlan(spec: UserSpec): void
}


const TableHead = () => {
    return (
        <thead>
            <tr>
                <th className="w-12">
                    <span role="img" aria-label="calendar icon">
                        📅
                    </span>{" "}
                    Week start
                </th>
                <th className="w-12">Mon</th>
                <th className="w-12">Tues</th>
                <th className="w-12">Weds</th>
                <th className="w-12">Thurs</th>
                <th className="w-12">Fri</th>
                <th className="w-12">Sat</th>
                <th className="w-12">Sun</th>
            </tr>
        </thead>
    )
}

const PlanRender = ({ plan, generatePlan }: PlanRenderPropsType) => {
    const {displayStyle, setDisplay} = useDisplayStyle();
    // const [displayType, setDisplayType] = useState("Compact");
    // const [showForm, toggleForm] = useState(false);

    if (!plan) return null;

    const today = moment().startOf("day");

    return (
        <div className="container-fluid bg-white text-dark py-2">

            <div className="bg-light border rounded p-2 my-2">
                <UserSpecForm handleSubmit={generatePlan} />
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Display style:</label>
                <select className="form-control" onChange={(e)=>{
                    setDisplay(e.target.value)
                }}
                value={displayStyle}
                >
                    <option value="overview">Overview</option>
                    <option value="compact">Compact</option>
                    <option value="detail">Detail</option>
                </select>
            </div>
            

            {displayStyle === "compact" || displayStyle === "overview" ? (
                <table className="table w-100 table-bordered table-striped">
                    <TableHead />
                    <tbody>
                        {plan.map((week, i) => {

                            const currentWeek = (displayStyle === "compact") && week.startDate.clone().startOf("week").isBefore(today) && week.startDate.clone().endOf("week").isAfter(today);
                            const completedWeek =  (displayStyle === "compact") && week.startDate.clone().startOf("week").isBefore(today.clone().startOf("week"));
                            
                            return (
                            <tr key={week.startDate.format()} className={`${ completedWeek ? " faded": ""} `}>
                                
                                <td className={`${currentWeek ? " font-weight-bold": ""} ${ completedWeek ? "py-0" : ""}`}>{week.startDate.format("Do MMM YYYY")} <br />
                                { !completedWeek ? (
                                    <span>Week : {i + 1}</span>
                                ) : null}
                                
                                </td>
                                {week.days.map((day) => {
                                    if (!day.primaryActivity ) return null;

                                    const spec = get(day, "primaryActivity.details.details.spec", undefined);
                                    const durationHuman = spec && spec.duration ? moment(new Date())
                                        .startOf("day")
                                        .seconds(roundUp(spec.duration, 300))
                                        .format("H:mm:ss") : null;
                                    const effort = get(day, "primaryActivity.details.details.effort", undefined);

                                    const distance = spec && spec.approx_distance ? Math.round(spec.approx_distance / 1000) : null;

                                    const theme = getTheme(day.primaryActivity.category);
                                    
                                    if (currentWeek) {
                                        return (
                                            <td key={day.day.humanDate} className={``}>
                                                
                                                <div className={`bg-${theme} rounded`} style={{height:"6px"}}></div>
                                                <div className="px-2 py-0">
                                                <h3 className="h6 mt-1  font-weight-bold">
                                                
                                                {day.primaryActivity.title} 
                                                </h3>
                                                {effort ? (
                                                    <div className="w-100 d-flex flex-align-center justify-content-between align-items-center">
                                                        <strong>{ durationHuman }</strong> <span className="text-grey">~{ distance }km</span>
                                                        
                                                        <span className={`badge badge-dark d-inline-flex`}>
                                                            { effort && effort.name ? `${effort.rpe.min}-${effort.rpe.max}` : null}
                                                        </span>
                                                    </div>
                                                ) : null }
                                                </div>
                                                
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td key={day.day.humanDate} className={`text-muted faded-7 ${ completedWeek ? "py-0" : ""}`}>
                                                    { !completedWeek ? (
                                                    <div className={`bg-${theme} rounded`} style={{height:"2px"}}></div>
                                                    ) : null }

                                                <div className="px-2 py-0">
                                                <h3 className="h6 mt-1 ">
                                                
                                                {day.primaryActivity.title} 
                                                </h3>
                                                {effort && !completedWeek ? (
                                                    <div className="w-100 d-flex flex-align-center justify-content-between align-items-center">
                                                        <strong>{ durationHuman }</strong> <span className="text-grey">~{ distance }km</span>
                                                        
                                                        <span className={`badge badge-secondary  d-inline-flex`}>
                                                            { effort && effort.name ? `${effort.rpe.min}-${effort.rpe.max}` : null}
                                                        </span>
                                                    </div>
                                                ) : null }
                                                </div>
                                                
                                            </td>
                                        );
                                    }
                                    
                                    
                                })}
                            </tr>
                        )})}
                    </tbody>
                </table>
            ) :  null }
            {displayStyle === "detail" ? (
                <table className="table w-100 table-bordered table-striped">
                        <TableHead />
                    <tbody>
                        {plan.map((week, i) => (
                            <tr key={week.startDate.format()} className={ week.startDate.clone().add(6, "days").startOf("day").isBefore(today) ? "d-none": ""}>
                                
                                <td>{week.startDate.format("Do MMM YYYY")} <br />
                                Week : {i + 1}
                                </td>
                                {week.days.map((day) => {
                                    if (!day.primaryActivity ) return null;

                                    const spec = get(day, "primaryActivity.details.details.spec", undefined);
                                    const effort = get(day, "primaryActivity.details.details.effort", undefined);

                                    const theme = getTheme(day.primaryActivity.category);
                                    return (
                                        <td key={day.day.humanDate}>
                                            <h3 className="h5">
                                                <div className={`bg-${theme} rounded`} style={{height:"6px"}}>
                                                </div>
                                                <span className={`badge badge-${theme}`}>{day.primaryActivity.category}</span>
                                                    <span className=" d-inline-block mt-2 font-weight-bold ml-2">
                                                        {day.primaryActivity.title}
                                                    </span>
                                                
                                            </h3>
                                            <hr />
                                            
                                            { spec ? <RunTable spec={spec} /> : null }
                                            { effort ? <EffortTable effort={effort} /> : null}

                                            {day.extraActivities && day.extraActivities.map((ea) => <div key={ea.category}>{ea.category}</div>)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ): null}
        </div>
    );
};

interface PlanTypes {
    plan: WeekPlan[], 
    generatePlan(spec: UserSpec): void
}

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

const Plan = ({ plan, generatePlan }: PlanTypes) => {
    useEffect(() => {
        if (!plan) {
            generatePlan(USER_CRITERIA);
        }
    }, [plan, generatePlan]);

    return (
        <div className="bg-primary rounded-top" >
            <PlanRender plan={plan} generatePlan={generatePlan} />
        </div>
    );
};

export default connect(
    (state) => ({
        plan: tp.getPlan(state)
    }),
    {
        generatePlan: tp.generatePlan
    }
)(Plan);
