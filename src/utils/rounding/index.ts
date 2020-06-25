// Rounds a number to the nearest N...
export const roundTo = (value: number, n: number = 10): number => {
    return n * Math.round(value / n);
};

export const roundUp = (value: number, n: number = 10): number => {
    return ~~((value + n - 1) / n) * n; // Nearest n
};
