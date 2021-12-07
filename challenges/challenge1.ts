import { readFile } from "./../utils/utils";

export const solve = async (testMode = false) => {
  const { data } = await readFile<number>(
    __dirname + `/${testMode ? "test-" : ""}input.csv`,
    (value) => parseInt(value.trim())
  );

  return data.reduce((acc, current, index) => {
    const previousValue = data[index - 1];

    if (current > previousValue) {
      acc += 1;
    }
    return acc;
  }, 0);
};
