export const required = value => (value ? undefined : "Required");

export const minWeeks6 = value =>
  value < 6 ? "Your plan must be longer than 6 weeks" : undefined;

export const maxWeeks52 = value =>
  value > 52 ? "Your plan must be shorter than a year!" : undefined;
