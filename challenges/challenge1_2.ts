import { processInput } from "./utils";

export const solve = async (testMode = false) => {
  const fileName = `/${testMode ? "test-" : ""}input.csv`;

  const data = await processInput(fileName);

  return data.reduce((acc, current, index) => {
    const pivot = current + data[index + 1];

    const currentGroup = pivot + data[index + 2];
    const previousGroup = pivot + data[index - 1];

    if (currentGroup > previousGroup) {
      acc += 1;
    }
    return acc;
  }, 0);
};
