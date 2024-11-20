export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const compareDecimals = (a: number, b: number) => {
  return Math.abs(a - b) < Number.EPSILON;
};

export const findHypotenuse = (a: number, b: number) => {
  return Math.sqrt(a ** 2 + b ** 2);
};
