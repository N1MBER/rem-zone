export const generateRandomValue = (maxLimit = 10) => {
  const rand = Math.random() * maxLimit;
  const value = Math.floor(rand);
  return value;
};
