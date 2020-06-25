import moment, { Moment } from "moment";

import {
  WeekPlan,
  DayPlan,
  UserSpec,
  Activity,
  Day,
  Run,
  ProgressType,
  CrossType,
  CrossRoutineType,
} from "../../types";

import { roundTo } from "../../utils/rounding";
import { getEffort } from "./constants/getEffort";

import { HR } from "./constants/getEffort";

const weekSchedule: Record<string, string[]> = {
  regular: [
    "long",
    "rest_or_easy",
    "hit",
    "rest_or_easy",
    "hit",
    "base",
    "rest",
  ],
  double: [
    "pair_2",
    "rest_or_easy",
    "hit",
    "rest_or_easy",
    "base",
    "rest",
    "pair_1",
  ],
  ultra: [
    "long+",
    "rest_or_easy",
    "hit",
    "rest_or_easy",
    "base",
    "rest",
    "easy",
  ],
  recovery: [
    "long_r",
    "rest_or_easy",
    "hit",
    "base",
    "hit",
    "rest_or_easy",
    "parkrun",
  ],
  taper: [
    "long_taper",
    "rest_or_easy",
    "base",
    "hit",
    "base",
    "rest_or_easy",
    "easy",
  ],
  race: [
    "race",
    "rest_or_easy",
    "base",
    "rest_or_easy",
    "rest_or_easy",
    "rest",
    "easy",
  ],
};

// // https://freeradical.me/2013/05/21/three-ways-to-increase-running-stamina/
// const upperRoutinePool: string[] = ["Pressups", "Tricep dips"];

// const coreRoutinePool: string[] = ["plank", "russion twists"];

const generateIntervals = () => {
  const groups = [
    [1000, "4-6", HR.SPEED],
    [800, "6-8", HR.SPEED],
    [100, "8-10", [HR.SPEED[0], HR.SPRINT[1]]],
  ];

  const selected = groups[Math.floor(Math.random() * groups.length)];

  return {
    text: `Run for ${selected[0]}m @ HR ${selected[2]}%. Repeat ${
      selected[1]
    } times`,
  };
};

// https://www.redbull.com/gb-en/5-best-hill-running-sessions
const generateHills = () => {
  const groups = [
    "Just some hills - Run hard up the hill for two minutes and walk or jog back down to recover. Forget time and run on effort – you should feel ok to do another rep after your recovery. If not, you’ve gone too hard. Your recovery should be three to four minutes, so take your time coming back down. Finish with another 15 minutes of easy to moderate running.",
    "Hill loops - Start with an easy 10-minute run on the flat before moving to your hilly loop. Run at 80 percent effort for eight minutes, completing as many loops as you can in that time. Run strong up the hills and maintain your effort level on the flat and downhill. Take a three-minute walk recovery then repeat for the second eight-minute interval. Cool down with another 10-minute, easy jog on the flat.",
    // Pyramids
    "Find a hill that takes around 90 seconds to run up from bottom to top. After warming up, you’ll find your hill and run up it for different durations of time, turning round after each effort and jogging back down to recover. Moderate your speed so that you’re running faster on the shorter efforts than the longer ones.",
  ];

  const selected = groups[Math.floor(Math.random() * groups.length)];

  return { text: selected };
};

const stretches = [
  {
    group: "Leg stretches",
    types: ["quadriceps", "hamstrings", "glutes", "hip flexors", "calf"],
  },
  {
    group: "Core stretches",
    types: [
      "chest",
      "back",
      "abs",
      "obliques", // Core
    ],
  },
  {
    group: "Pilates",
    types: ["Stretchy core things"],
  },
  {
    group: "Extra stretches",
    types: ["arms", "neck", "toes", "feet"],
  },
  {
    group: "Yoga",
    types: ["Floppy yoga things"],
  },
];

const cross: CrossType[] = [
  {
    group: "Cross Set 1",
    types: [
      "plank", // core, lower back, shoulders 45-60s
      "russion twists", // core, obliques // 10-12 reps
      "Scorpion", // abs, hips, back // 3-5reps
      "Back Extension", // lower back, glutes, middle back, shoulders
      "Alternating Toe Touches", // Core
      "spiderman planks", // Core
    ],
  },
  {
    group: "Cross Set 2",
    types: [
      "Stability Ball Jackknife", // shoulders, core
      "Stability Ball Leg Curl", // hamstrings, glutes, core
      "Rotational Shoulder Press", // shoulders, triceps, core
      "Alternating Row", // middle back, biceps, core,
      "situps", // Core
      "pressups", // Upper
    ],
  },
  {
    group: "Cross Set 3",
    types: [
      "side plank", // Core
      "jumping squats", // Legs
      "Plank Up Downs", //Core //https://www.shape.com/fitness/workouts/18-ab-exercises-flat-belly-no-crunches-required
      "Squat To Overhead Press", // glutes, quads, hamstrings, lower back, upper back, shoulders
      "Overhead Forward Lunge", // quadriceps, hamstrings, glutes, shoulders, core
      "lunges", // Legs
    ],
  },
  {
    group: "Cross Set 4",
    types: ["X", "Y", "Z"],
    // routine: {
    //     reps: 8,
    //     steps: [
    //         { duration: 45, title: "Pressups", focus: "upper" },
    //         { duration: 15, title: "rest", focus: "rest" },
    //         { duration: 45, title: "Bicycle crunch", focus: "core" },
    //         { duration: 15, title: "rest", focus: "rest" },
    //         { duration: 45, title: "Bicycle crunch", focus: "core" },
    //         { duration: 15, title: "rest", focus: "rest" },
    //     ]
    // }
  },
];

const hitTypes = [
  {
    category: "Fartlek",
    description:
      "A steady paced run but interspersed with periods of faster 'anaerobic paced' running at random times of your choice.",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      {
        text: `Run for 30 mins @ HR ${
          HR.STAMINA
        }%, with random intervals @ HR ${HR.SPEED}% `,
      },
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },
  {
    category: "Interval",
    description:
      "Interval sessions are excellent at increasing your training threshold by building a tolerance to lactic acid and making the body more efficient at clearing it away. ",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      generateIntervals(),
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },

  {
    category: "Kenyan 25 1 1",
    description:
      "Interval sessions are excellent at increasing your training threshold by building a tolerance to lactic acid and making the body more efficient at clearing it away. ",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      generateIntervals(),
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },

  {
    category: "Hill climbs",
    description:
      "Running up hills builds strength and power in your legs, which, as well as helping you bound up hills like a mountain goat, will transfer into faster speeds on the flat, too",
    routine: [generateHills()],
  },

  {
    category: "Increase the pace",
    description: "Start off slow, get progressivly faster",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      { text: "20 mins", effort: HR.ENDURANCE },
      { text: "15 mins", effort: HR.STAMINA },
      { text: "10 mins", effort: HR.SPEED },
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },
  {
    category: "Progressive sprints",
    description: "Like intervals but with a third speed!",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      generateIntervals(),
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },
  {
    category: "HR Zone training",
    description: "Like intervals but with a third speed!",
    routine: [
      { text: "3 minute warmup", effort: HR.WARMUP },
      { text: "REPEAT N Times: 5 minutes @ HR.SPEED, 5 minutes @ HR.STAMINA" },
      { text: "3 minute cooldown", effort: HR.WARMUP },
    ],
  },
  // {
  //     category: "Split run",
  //     description: "Do 2 runs today",
  //     routine: [{ text: "3 minute warmup", effort: HR.WARMUP }, { text: "REPEAT N Times: 5 minutes @ HR.SPEED, 5 minutes @ HR.STAMINA" }, { text: "3 minute cooldown", effort: HR.WARMUP }]
  // }
  // "HR Zone", // Remove
  // "10/8/6 - discomfort, 2 min rest between",
  // "Increase pace every 15, [easy, steady, threshold]"
];

export const calculateDistanceForWeek = (
  week: number = 1,
  multiplier: number = 1,
  start: number = 1000,
  growthRatePercent: number = 5,
  max: number = 5000,
  planStrategies: string[]
): number => {
  let dist = start;
  // Loop through all weeks and calculate the distance to run for that week
  for (var w = 1; w < week; w++) {
    const strategy = planStrategies[w % planStrategies.length];
    let growth = 0;
    if (strategy !== "recovery") {
      growth = dist * growthRatePercent;
    }
    dist = dist + growth;
  }

  if (dist > max) {
    dist = max;
  }
  return dist * multiplier;
};

export class Progress {
  //
  planStrategies: string[] = ["regular", "regular", "special", "recovery"];
  specialStrategies: string[] = ["double", "ultra"];
  currentSpecialIndex = 0;

  // User spec
  userSpec: UserSpec;
  planStartDate: Moment;

  // Basic spec
  planLength: number = 12;
  planTailLength: number = 4;

  // Long Distance
  currentDistance: number = 0;
  startDistance: number = 0;
  endDistance: number = 0;
  growthRatePercent: number = 0;
  growthWeeks: number = 0;
  currentWeek: number = 1;

  // Base Distance
  baseStartDistance: number = 5000;
  baseCurrenttDistance: number = 5000;
  baseEndDistance: number = 10000;
  baseGrowthRate: number = 1000;

  // Interval progress

  // Cross progress
  hitStep: number = 0;
  flexStep: number = 0;
  crossStep: number = 0;

  // WEEK Progress
  currentWeekDistance: number = 0;
  currentWeekTime: number = 0;

  constructor(
    userSpec: UserSpec,
    startDistance: number,
    endDistance: number,
    planLength: number,
    planTailLength: number,
    planRecoverySpacing: number = 4
  ) {
    this.planStartDate = moment(userSpec.PLAN_START_DATE).startOf("day");

    this.userSpec = userSpec;
    this.planLength = planLength;
    this.planTailLength = planTailLength;

    // Work out the needed compound increase for each week to get to the target;
    // Available weeks where taper is not in progress
    const nonTaperWeeks: number = planLength - planTailLength;
    // Weeks where there is no recovery week (remove 1/ N tapered weeks)
    const growthWeeks: number =
      nonTaperWeeks - Math.floor(nonTaperWeeks / planRecoverySpacing);
    // https://math.stackexchange.com/questions/2416120/reverse-continuous-compound-interest-formula-solve-for-r
    const growthRatePercent: number =
      Math.log(endDistance / startDistance) / growthWeeks;

    // Long Distance
    this.currentDistance = startDistance;
    this.startDistance = startDistance;
    this.endDistance = endDistance;
    this.growthRatePercent = growthRatePercent;
    this.growthWeeks = growthWeeks;
    this.currentWeek = 1;

    // Base Distance
    this.baseStartDistance = 5000;
    this.baseCurrenttDistance = 5000;
    this.baseEndDistance = 10000;
    this.baseGrowthRate = 1000;

    // Interval progress

    // Cross progress
    this.hitStep = 0;
    this.flexStep = 0;
    this.crossStep = 0;
  }

  updateCurrentDistance = (): void => {
    if (this.currentWeek <= this.growthWeeks) {
      const curr = this.currentDistance;
      const growth = this.currentDistance * this.growthRatePercent;
      this.currentDistance = curr + growth;
    }
  };

  setCurrentDistanceToMax = (): void => {
    this.currentDistance = this.endDistance;
  };

  nextLongDistance = (multiplier: number = 1, week: number = 1): number => {
    let dist = this.startDistance;
    // Loop through all weeks and calculate the distance to run for that week
    for (var w = 1; w < week; w++) {
      const growth = dist * this.growthRatePercent;
      dist = dist + growth;
    }

    if (dist > this.endDistance) {
      dist = this.endDistance;
    }
    return dist * multiplier;
  };

  updateCurrentBaseDistance = (): void => {
    if (this.baseCurrenttDistance < this.baseEndDistance) {
      this.baseCurrenttDistance += this.baseGrowthRate;
    }
  };

  nextBaseDistance = (hold: boolean = false): number => {
    return this.baseCurrenttDistance;
  };

  nextCrossRoutine = (): CrossRoutineType => {
    const selectedItems = cross[this.crossStep % cross.length];

    // this.crossStep += 1;

    return {
      category: selectedItems.group,
      type: "cross",
      activity: {
        routine: selectedItems.types,
      },
    };
  };

  nextFlexRoutine = () => {
    const selectedItems = stretches[this.flexStep % stretches.length];

    // this.flexStep += 1;

    return {
      category: selectedItems.group,
      type: "flex",
      activity: {
        routine: selectedItems.types,
      },
    };
  };

  nextHITRoutine = () => {
    const selectedItems = hitTypes[this.hitStep % hitTypes.length];

    // this.hitStep += 1;

    return {
      category: selectedItems.category,
      type: "hit",
      activity: {
        routine: selectedItems.routine,
      },
    };
  };

  getFocus = (week: number): string => {
    if (this.planLength === week) {
      return "race";
    }

    if (this.planLength - week < this.planTailLength) {
      return "taper";
    }

    if (this.planLength - week === this.planTailLength) {
      // Last week before taper is always a regular long run
      return "regular";
    }

    return this.planStrategies[week % this.planStrategies.length];
  };

  getRest = (): Activity => {
    return {
      type: "rest",
      category: "rest",
      title: "😴 Rest day",
    };
  };

  updateSpecialType = (): void => {
    this.currentSpecialIndex += 1;
  };

  currentSpecial = (): number => {
    return this.currentSpecialIndex % this.specialStrategies.length;
  };

  updateWeekStats = (distance: number = 0, time: number = 0): void => {
    this.currentWeekDistance += distance;
    this.currentWeekTime += time;
  };

  resetWeekStats = (): void => {
    this.currentWeekDistance = 0;
    this.currentWeekTime = 0;
  };

  createActivitySpec = (
    userCriteria: UserSpec,
    distance: number,
    paceName: string = "warmup"
  ): Activity => {
    const effortMatrix = getEffort(paceName);

    const duration = distance / effortMatrix.pace;
    const details: Run = {
      spec: {
        duration,
        approx_distance: distance,
      },
      effort: {
        rpe: {
          min: effortMatrix.lower_rpe,
          max: effortMatrix.upper_rpe,
        },
        hr: {
          min: roundTo(
            (userCriteria.USER_MAX_HR / 100) * effortMatrix.lower_hrp,
            5
          ),
          max: roundTo(
            (userCriteria.USER_MAX_HR / 100) * effortMatrix.upper_hrp,
            5
          ),
        },
        hrp: {
          min: effortMatrix.lower_hrp,
          max: effortMatrix.upper_hrp,
        },
        name: paceName,
      },
    };

    return {
      details: details,
      category: "run",
      type: "base",
      title: "My run",
    };
  };

  createDay = (date: Moment): Day => {
    const humanDate: string = date.startOf("day").format("ddd, MMMM Do YYYY");

    const day: Day = {
      date: date,
      humanDate: humanDate,
    };

    return day;
  };

  createLongDay = (
    date: Moment,
    userCriteria: UserSpec,
    distance: number = 5000,
    title: string = "Long",
    category: string = "long"
  ): DayPlan => {
    return {
      day: this.createDay(date),
      primaryActivity: {
        type: "run",
        category: category,
        title: title,
        details: this.createActivitySpec(userCriteria, distance, "endurance"),
      },
    };
  };

  createHitDay = (
    date: Moment,
    userCriteria: UserSpec,
    progress: ProgressType,
    distance: number = 5000
  ): DayPlan => {
    return {
      day: this.createDay(date),
      primaryActivity: {
        type: "run",
        category: "hit",
        title: "Training day",
        details: this.createActivitySpec(userCriteria, distance, "speed"),
      },
      extraActivities: [this.nextFlexRoutine()],
    };
  };

  createBaseDay = (
    date: Moment,
    userCriteria: UserSpec,
    progress: ProgressType
  ): DayPlan => {
    return {
      day: this.createDay(date),
      primaryActivity: {
        type: "run",
        category: "base",
        title: "Base run",
        details: this.createActivitySpec(
          userCriteria,
          this.nextBaseDistance(),
          "stamina"
        ),
      },
      extraActivities: [this.nextFlexRoutine(), this.nextCrossRoutine()],
    };
  };

  createEasyDay = (
    date: Moment,
    userCriteria: UserSpec,
    progress: ProgressType,
    distance: number = 3000
  ): DayPlan => {
    return {
      day: this.createDay(date),
      primaryActivity: {
        type: "run",
        category: "easy",
        title: "Short run",
        details: this.createActivitySpec(userCriteria, distance, "endurance"),
      },
      extraActivities: [this.nextFlexRoutine(), this.nextCrossRoutine()],
    };
  };

  createRestDay = (date: Moment, progress: ProgressType): DayPlan => {
    return {
      day: this.createDay(date),
      primaryActivity: this.getRest(),
      extraActivities: [this.nextCrossRoutine(), this.nextFlexRoutine()],
    };
  };

  createWeekDay = (
    focus: string,
    date: Moment,
    userCriteria: UserSpec,
    progress: ProgressType
  ): DayPlan => {
    const dayType: string = weekSchedule[focus][date.day()];

    switch (dayType) {
      case "race":
        return this.createLongDay(
          date,
          userCriteria,
          this.endDistance,
          "Race day",
          "race"
        );
      case "long+":
        return this.createLongDay(
          date,
          userCriteria,
          calculateDistanceForWeek(
            this.currentWeek,
            1.2,
            this.startDistance,
            this.growthRatePercent,
            this.endDistance,
            this.planStrategies
          ),
          "Longer run",
          "long+"
        );
      case "pair_1":
        return this.createLongDay(
          date,
          userCriteria,
          calculateDistanceForWeek(
            this.currentWeek,
            0.5,
            this.startDistance,
            this.growthRatePercent,
            this.endDistance,
            this.planStrategies
          ),
          "Pair #1",
          "1/2"
        );
      case "pair_2":
        return this.createLongDay(
          date,
          userCriteria,
          calculateDistanceForWeek(
            this.currentWeek,
            0.9,
            this.startDistance,
            this.growthRatePercent,
            this.endDistance,
            this.planStrategies
          ),
          "Pair #2",
          "2/2"
        );
      case "long_r":
        return this.createLongDay(
          date,
          userCriteria,
          calculateDistanceForWeek(
            this.currentWeek,
            0.75,
            this.startDistance,
            this.growthRatePercent,
            this.endDistance,
            this.planStrategies
          ),
          "Recovery",
          "long-"
        );
      case "long_taper":
        return this.createLongDay(
          date,
          userCriteria,
          this.endDistance * 0.2,
          "Taper run",
          "taper"
        );
      case "long":
        return this.createLongDay(
          date,
          userCriteria,
          calculateDistanceForWeek(
            this.currentWeek,
            1,
            this.startDistance,
            this.growthRatePercent,
            this.endDistance,
            this.planStrategies
          )
        );
      case "hit":
        return this.createHitDay(date, userCriteria, progress, 8000);
      case "base":
        return this.createBaseDay(date, userCriteria, progress);
      case "parkrun":
        return {
          day: this.createDay(date),
          primaryActivity: {
            type: "run",
            category: "parkrun",
            title: "Parkrun",
            details: this.createActivitySpec(userCriteria, 5000, "endurance"),
          },
          extraActivities: [this.nextFlexRoutine()],
        };
      case "easy":
        return this.createEasyDay(date, userCriteria, progress, 3000);
      case "rest_or_easy":
        return {
          day: this.createDay(date),
          primaryActivity: {
            type: "run",
            category: "easy",
            title: "Easy",
            details: this.createActivitySpec(userCriteria, 3000, "endurance"),
          },
          extraActivities: [this.nextFlexRoutine()],
        };
      default:
        // Always rest where possible!
        return this.createRestDay(date, progress);
    }
  };

  createDayPlan = (
    weekStartDate: Moment,
    dayOfWeek: number,
    focus: string
  ): DayPlan => {
    const dayDate: Moment = moment(weekStartDate).add(dayOfWeek, "days");

    switch (focus) {
      case "special":
        switch (this.currentSpecial()) {
          case 0:
            return this.createWeekDay("ultra", dayDate, this.userSpec, this);
          default:
            return this.createWeekDay("double", dayDate, this.userSpec, this);
        }
      default:
        return this.createWeekDay(focus, dayDate, this.userSpec, this);
    }
  };

  createWeekDays = (
    week: number = 1,
    focus: string,
    weekStartDate: Moment
  ): DayPlan[] => {
    // Generate day data for week
    const days: DayPlan[] = [];

    for (let day = 0; day < 7; day += 1) {
      const dayPlan = this.createDayPlan(weekStartDate, day, focus);
      days.push(dayPlan);
    }

    return days;
  };

  createWeek = (w: number, focus: string): WeekPlan => {
    const newWeekStart: Moment = this.planStartDate
      .clone()
      .add(w - 1, "weeks")
      .startOf("day");

    // Generate day data for week
    const days: DayPlan[] = this.createWeekDays(w, focus, newWeekStart);

    const weekPlan: WeekPlan = {
      week: w,
      focus: focus,
      startDate: newWeekStart,
      days: days,
    };

    return weekPlan;
  };

  createPlan = (): WeekPlan[] => {
    let plan: WeekPlan[] = [];
    for (let w = 1; w <= this.planLength; w += 1) {
      this.currentWeek = w;
      const focus: string = this.getFocus(w);
      if (focus === "special") this.updateSpecialType();

      // Generate week data
      const weekPlan = this.createWeek(w, focus);
      plan.push(weekPlan);

      // Setup things for the next week
      if (focus !== "recovery") this.updateCurrentBaseDistance();

      this.resetWeekStats();
    }

    return plan;
  };
}

export default Progress;
