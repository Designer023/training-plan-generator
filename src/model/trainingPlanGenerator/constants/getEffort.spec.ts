import {getEffort} from "./getEffort"
const warmup = {
    pace: 2,
    lower_hrp: 60,
    upper_hrp: 70,
    lower_rpe: 3,
    upper_rpe: 4,
    feel: "Light jog. Can easily chat away!"
};

const def = {
    pace: 2,
    lower_hrp: 60,
    upper_hrp: 70,
    lower_rpe: 3,
    upper_rpe: 4,
    feel: "Light jog. Can easily chat away!"
};

describe( 'getEffort', () => {
    
    test('"warmup" should return correct object', () => {
        expect(getEffort("warmup")).toEqual(warmup)
    });

    test('default should return default values', () => {
        expect(getEffort("default")).toEqual(def)
    });
});