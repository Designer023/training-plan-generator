import { roundTo, roundUp } from "./index";

describe( 'roundTo', () => {
    describe( 'roundTo to the nearest multiple of 10', () => {
        test('Should round 10 => 10', () => {
            expect(roundTo(10, 10)).toBe(10)
        });

        test('Should round 9 => 10', () => {
            expect(roundTo(9, 10)).toBe(10)
        });

        test('Should round 8 => 10', () => {
            expect(roundTo(8, 10)).toBe(10)
        });

        test('Should round 7 => 10', () => {
            expect(roundTo(7, 10)).toBe(10)
        });

        test('Should round 6 => 10', () => {
            expect(roundTo(6, 10)).toBe(10)
        });

        test('Should round 5 => 10', () => {
            expect(roundTo(5, 10)).toBe(10)
        });

        test('Should round 4 => 0', () => {
            expect(roundTo(4, 10)).toBe(0)
        });

        test('Should round 3 => 0', () => {
            expect(roundTo(3, 10)).toBe(0)
        });

        test('Should round 2 => 0', () => {
            expect(roundTo(2, 10)).toBe(0)
        });

        test('Should round 1 => 0', () => {
            expect(roundTo(1, 10)).toBe(0)
        });

    });

    describe( 'roundTo to the nearest  multiple of 5', () => {
        test('Should round 5 => 5', () => {
            expect(roundTo(5, 5)).toBe(5)
        });

        test('Should round 4 => 5', () => {
            expect(roundTo(4, 5)).toBe(5)
        });

        test('Should round 3 => 5', () => {
            expect(roundTo(3, 5)).toBe(5)
        });

        test('Should round 2 => 0', () => {
            expect(roundTo(2, 5)).toBe(0)
        });

        test('Should round 1 => 0', () => {
            expect(roundTo(1, 5)).toBe(0)
        });
    });

    describe( 'roundTo to the nearest multiple of 3', () => {
        test('Should round 3 => 3', () => {
            expect(roundTo(3, 3)).toBe(3)
        });

        test('Should round 2 => 3', () => {
            expect(roundTo(2, 3)).toBe(3)
        });

        test('Should round 1 => 0', () => {
            expect(roundTo(1, 3)).toBe(0)
        });

        test('Should round 4 => 3', () => {
            expect(roundTo(4, 3)).toBe(3)
        });

    });

});






describe( 'roundUp', () => {
    describe( 'roundUp to the nearest multiple of 10', () => {
        test('Should round 10 => 10', () => {
            expect(roundUp(10, 10)).toBe(10)
        });

        test('Should round 9 => 10', () => {
            expect(roundUp(9, 10)).toBe(10)
        });

        test('Should round 8 => 10', () => {
            expect(roundUp(8, 10)).toBe(10)
        });

        test('Should round 7 => 10', () => {
            expect(roundUp(7, 10)).toBe(10)
        });

        test('Should round 6 => 10', () => {
            expect(roundUp(6, 10)).toBe(10)
        });

        test('Should round 5 => 10', () => {
            expect(roundUp(5, 10)).toBe(10)
        });

        test('Should round 4 => 10', () => {
            expect(roundUp(4, 10)).toBe(10)
        });

        test('Should round 3 => 10', () => {
            expect(roundUp(3, 10)).toBe(10)
        });

        test('Should round 2 => 10', () => {
            expect(roundUp(2, 10)).toBe(10)
        });

        test('Should round 1 => 10', () => {
            expect(roundUp(1, 10)).toBe(10)
        });

    });

    describe( 'roundTo to the nearest  multiple of 5', () => {
        test('Should round 5 => 5', () => {
            expect(roundUp(5, 5)).toBe(5)
        });

        test('Should round 4 => 5', () => {
            expect(roundUp(4, 5)).toBe(5)
        });

        test('Should round 3 => 5', () => {
            expect(roundUp(3, 5)).toBe(5)
        });

        test('Should round 2 => 0', () => {
            expect(roundUp(2, 5)).toBe(5)
        });

        test('Should round 1 => 0', () => {
            expect(roundUp(1, 5)).toBe(5)
        });
    });

    describe( 'roundTo to the nearest multiple of 3', () => {
        test('Should round 3 => 3', () => {
            expect(roundUp(3, 3)).toBe(3)
        });

        test('Should round 2 => 3', () => {
            expect(roundUp(2, 3)).toBe(3)
        });

        test('Should round 1 => 0', () => {
            expect(roundUp(1, 3)).toBe(3)
        });

        test('Should round 4 => 3', () => {
            expect(roundUp(4, 3)).toBe(6)
        });

    });

});
