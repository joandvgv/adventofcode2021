import { processInput } from "../utils";

export const solve = async (testMode = false) => {
  const fileName = `/${testMode ? "test-" : ""}input.csv`;

  const data = await processInput<number>(fileName, 1);

  return data.reduce((acc, current, index) => {
    const previousValue = data[index - 1];

    if (current > previousValue) {
      acc += 1;
    }
    return acc;
  }, 0);
};
