export const getRandomElement = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];
