export const HR = {
    WARMUP: [40, 50], // 3+ hours
    ENDURANCE: [50, 65], // 3+ hours
    STAMINA: [65, 80], // 2 - 3 hours
    SPEED: [80, 90], // 5 - 25 mins
    SPRINT: [90, 100] // 1-8 mins
};

interface EfforttSub {
    pace: number;
    lower_hrp: number;
    upper_hrp: number;
    lower_rpe: number;
    upper_rpe: number;
    feel: string;
}
interface EffortObject {
    warmup: EfforttSub
    endurance: EfforttSub;
    stamina: EfforttSub;
    speed: EfforttSub;
    sprint: EfforttSub;
    default: EfforttSub;
    [key: string]: EfforttSub;
}

const efforts: EffortObject = {
    warmup: {
        pace: 2,
        lower_hrp: 60,
        upper_hrp: 70,
        lower_rpe: 3,
        upper_rpe: 4,
        feel: "Light jog. Can easily chat away!"
    },
    endurance: {
        pace: 2.3,
        lower_hrp: 70,
        upper_hrp: 75,
        lower_rpe: 4,
        upper_rpe: 5,
        feel: "Jog, but can chat"
    },
    stamina: {
        pace: 3,
        lower_hrp: 75,
        upper_hrp: 85,
        lower_rpe: 5,
        upper_rpe: 6,
        feel: "Comfortable-ish. Good pace. with a sweat"
    },
    speed: {
        pace: 4.0,
        lower_hrp: 85,
        upper_hrp: 95,
        lower_rpe: 7,
        upper_rpe: 9,
        feel: "Hard to talk or Short answers"
    },
    sprint: {
        pace: 4.4,
        lower_rpe: 9,
        upper_rpe: 10,
        lower_hrp: 95,
        upper_hrp: 100,
        feel: "Almost impossible to talk or Can't even talk. This can only be done for 10-20 seconds."
    },
    default: {
        pace: 2,
        lower_hrp: 60,
        upper_hrp: 70,
        lower_rpe: 3,
        upper_rpe: 4,
        feel: "Light jog. Can easily chat away!"
    }
};

export const getEffort = (key: string) => {
    return efforts[key] || efforts.default;
};
