import { processInput } from "../utils";

const transpose = (matrix: string[][]) =>
  matrix.reduce(
    ($: string[][], row) => row.map((_, i) => [...($[i] || []), row[i]]),
    []
  );

export const solve = async (testMode = false) => {
  const fileName = `/${testMode ? "test-" : ""}input.csv`;

  const data = await processInput<string[]>(fileName, 3, "binary");

  const bitSize = data[0].join("").length;
  const positions = { ...new Array(bitSize).fill(null) };
  const values = transpose(data);

  let gamma: string | number = "";
  let epsilon: string | number = "";

  for (const position in positions) {
    const diagnosticReports = values[position];

    const sum = diagnosticReports.reduce(
      (acc, curr) => acc + parseInt(curr),
      0
    );

    const reportCount = diagnosticReports.length;
    const positiveReport = sum > reportCount / 2;

    gamma += positiveReport ? "1" : "0";
    epsilon += positiveReport ? "0" : "1";
  }

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  return gamma * epsilon;
};
