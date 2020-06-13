import {  UserSpec, ProgressType, WeekPlan, DayPlan } from "./types";
import Progress, {calculateDistanceForWeek} from "./progress";
import moment, {Moment} from "moment";

const USER_CRITERIA: UserSpec = {
    PLAN_LENGTH: 23, // WEEKS
    PLAN_TAIL_OFF_LENGTH: 4,
    PLAN_RECOVER_WEEK_EVERY: 4,
    PLAN_START_DISTANCE: 21000, // m
    PLAN_END_DISTANCE: 50000, // m
    PLAN_START_DATE: new Date(2020, 0, 6).toISOString(),
    USER_MAX_HR: 185,
    USER_PACES: {
        // PACES in m per sec
        ENDURANCE: 3.194444,
        STAMINA: 6.0
    }
};

// Define the loop that weeks run at
const planStrategies: string[] = ["regular", "regular", "special", "recovery"];

let progress: ProgressType;
let plan: WeekPlan[];


// afterAll(() => {
//     return clearCityDatabase();
// });

beforeEach(() => {
});

// afterEach(() => {
//     clearCityDatabase();
// });
describe( 'Base functions', () => {
    beforeAll(() => {
        progress = new Progress(USER_CRITERIA, USER_CRITERIA.PLAN_START_DISTANCE, USER_CRITERIA.PLAN_END_DISTANCE, USER_CRITERIA.PLAN_LENGTH, USER_CRITERIA.PLAN_TAIL_OFF_LENGTH);
    });

    test('nextLongDistance() week 1', () => {
        const distance: number = calculateDistanceForWeek(1, 1, 21000, progress.growthRatePercent, 50000, planStrategies);
        expect(distance).toBe(21000)
    });

    test('nextLongDistance() week 2', () => {
        const distance: number = calculateDistanceForWeek(2, 1, 21000, progress.growthRatePercent, 50000, planStrategies);
        expect(distance).toBe(22214.50079478661)
    });

    test('nextLongDistance() week 2 - longer', () => {
        const distance: number = calculateDistanceForWeek(2, 1.5, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(33321.751192179916)
    });

    test('nextLongDistance() week 2 - shorter', () => {
        const distance: number = calculateDistanceForWeek(2, 0.75, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(16660.875596089958)
    });

    test('nextLongDistance() week 4', () => {
        const distance: number = calculateDistanceForWeek(4, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(23499.240264836902)
    });

    test('nextLongDistance() week 8', () => {
        const distance: number = calculateDistanceForWeek(8, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(27816.70034305214)
    });

    test('nextLongDistance() week 12', () => {
        const distance: number = calculateDistanceForWeek(12, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(32927.39719475043)
    });

    test('nextLongDistance() week 16', () => {
        const distance: number = calculateDistanceForWeek(16, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(38977.07034442228)
    });

    test('nextLongDistance() week 19', () => {
        const distance: number = calculateDistanceForWeek(19, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(46138.235696207674)
    });

    test('nextLongDistance() race week', () => {
        const distance: number = calculateDistanceForWeek(23, 1, 21000, progress.growthRatePercent, 50000, planStrategies)
        expect(distance).toBe(USER_CRITERIA.PLAN_END_DISTANCE)
    });

});

describe( '21km to 50km', () => {
    
    describe( 'Progress', () => {
        beforeAll(() => {
            progress = new Progress(USER_CRITERIA, USER_CRITERIA.PLAN_START_DISTANCE, USER_CRITERIA.PLAN_END_DISTANCE, USER_CRITERIA.PLAN_LENGTH, USER_CRITERIA.PLAN_TAIL_OFF_LENGTH);
        });

        test('Plan length should be 23', () => {
            expect(progress.planLength).toBe(23)
        });

        test('Tail length should be 4', () => {
            expect(progress.planTailLength).toBe(4)
        });

        test('currentWeek should be 1', () => {
            expect(progress.currentWeek).toBe(1)
        });

        test('currentDistance 2100', () => {
            expect(progress.currentDistance).toBe(21000)
        });

        test('startDistance 21000', () => {
            expect(progress.startDistance).toBe(21000)
        });

        test('endDistance 50000', () => {
            expect(progress.endDistance).toBe(50000)
        });

        test('currentWeekDistance should be 1', () => {
            expect(progress.currentWeekDistance).toBe(0)
        });

        test('currentWeekTime should be 0', () => {
            expect(progress.currentWeekTime).toBe(0)
        });

        test('baseStartDistance should be 5000', () => {
            expect(progress.baseStartDistance).toBe(5000)
        });

        test('baseCurrenttDistance should be 5000', () => {
            expect(progress.baseCurrenttDistance).toBe(5000)
        });

        test('baseEndDistance should be 10000', () => {
            expect(progress.baseEndDistance).toBe(10000)
        });

        test('baseGrowthRate should be 1000', () => {
            expect(progress.baseGrowthRate).toBe(1000)
        });
    });
    
    describe( 'Generated plan', () => {
        beforeAll(() => {
            progress = new Progress(USER_CRITERIA, USER_CRITERIA.PLAN_START_DISTANCE, USER_CRITERIA.PLAN_END_DISTANCE, USER_CRITERIA.PLAN_LENGTH, USER_CRITERIA.PLAN_TAIL_OFF_LENGTH);
            plan = progress.createPlan();
        });

        test('Created plan length should be 23', () => {
            
            expect(plan.length).toBe(23)
        });

        test("The plan ends at 50000", () => {
            expect(progress.nextLongDistance(1, 23)).toBe(50000)
        })

    });


    // describe( 'Generated specific week', () => {
    //     beforeAll(() => {
    //         progress = new Progress(USER_CRITERIA, USER_CRITERIA.PLAN_START_DISTANCE, USER_CRITERIA.PLAN_END_DISTANCE, USER_CRITERIA.PLAN_LENGTH, USER_CRITERIA.PLAN_TAIL_OFF_LENGTH);
    //     });

    //     test('Week 10', () => {
    //         const weekStart: Moment = moment();
    //         const week: DayPlan[] = progress.createWeekDays(10, "regular", weekStart)
    //         const week2: DayPlan[] = progress.createWeekDays(10, "regular", weekStart)
    //         expect(week).toBe(week2)
    //     });

    // });
});
