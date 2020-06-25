import { DayPlan } from './index';
import {Moment} from "moment";

export interface UserSpec {
        PLAN_LENGTH: number
        PLAN_TAIL_OFF_LENGTH: number
        PLAN_RECOVER_WEEK_EVERY:number
        PLAN_START_DISTANCE: number
        PLAN_END_DISTANCE: number
        PLAN_START_DATE: string,
        USER_MAX_HR: number,
        USER_PACES: {
            // PACES in m per sec
            ENDURANCE: number,
            STAMINA: number
        }
}
export interface Run {
    spec: {
        duration: number,
        approx_distance: number
    },
    effort: {
        rpe: {
            min:number,
            max: number
        },
        hr: {
            min: number,
            max: number
        },
        hrp: {
            min: number,
            max: number
        },
        name: string
    }
}

export interface Cross {
}


export interface Activity {
    type: string,  // run, cross, hit, flex
    category: string,
    title?: string,
    description?: string,
    details?: Run | Cross
}

export interface Day {
    date: Moment,
    humanDate: string,
}

export interface  Details {
    type: string,
    category: string,
    title: string,
}

export interface DayPlan {
    day: Day,
    primaryActivity?: Activity,
    extraActivities?: Activity[];
}

export interface WeekPlan {
    week: number,
    focus: string,
    startDate: Moment,
    days: DayPlan[]
}

export type Class = { new(...args: any[]): any; };


export interface ProgressType {
    nextLongDistance(multiplier?: number, week?: number): number,
    nextBaseDistance(hold?:boolean): number,
    growthRatePercent: number,
    nextFlexRoutine(): any,
    nextHITRoutine(): any,
    nextCrossRoutine(): any,
    updateWeekStats(distance?: number, time?: number): void,
    resetWeekStats(): void,
    createPlan(): WeekPlan[],
    createWeekDays(week: number,focus: string, weekStartDate: Moment): DayPlan[],
    createWeek(w:number, focus:string): WeekPlan,
    createDayPlan(weekStartDate: Moment, dayOfWeek: number, focus: string, planStrategies: string[]): DayPlan;
};

export interface CrossType {
    group: string,
    types: string[]
}

export interface ActivityGroupType {
    routine: string[]
}

export interface CrossRoutineType {
    category: string,
    type: string,
    activity: ActivityGroupType
}
