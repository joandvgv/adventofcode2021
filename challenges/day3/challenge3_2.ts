import { processInput } from "../utils";

const transpose = (matrix: string[][]) =>
  matrix.reduce(
    ($: string[][], row) => row.map((_, i) => [...($[i] || []), row[i]]),
    []
  );

const processDiagnostics = (
  bitSize: number,
  values: string[][],
  type: "scrubber" | "generator"
) => {
  let diagnosticData = [...new Set(values)];
  let transposedData = transpose(diagnosticData);
  const positions = { ...new Array(bitSize).fill(null) };

  for (const position in positions) {
    const diagnosticReports = transposedData[position];

    const sum = diagnosticReports.reduce(
      (acc, curr) => acc + parseInt(curr),
      0
    );

    const [on, off] = type === "generator" ? ["1", "0"] : ["0", "1"];

    const reportCount = diagnosticReports.length;
    const positiveReport = sum > reportCount / 2 || sum === reportCount / 2;

    if (diagnosticData.length > 1) {
      const filteredDiagnostics = diagnosticData.filter((splitNumber) => {
        const currentBit = splitNumber[position];
        return positiveReport ? currentBit === on : currentBit === off;
      });

      diagnosticData = filteredDiagnostics;
      transposedData = transpose(diagnosticData);
    }
  }
  return parseInt(diagnosticData[0].join(""), 2);
};

export const solve = async (testMode = false) => {
  const fileName = `/${testMode ? "test-" : ""}input.csv`;

  const data = await processInput<string[]>(fileName, 3, "binary");

  const bitSize = data[0].join("").length;

  const oxygenGeneratorRating = processDiagnostics(bitSize, data, "generator");
  const co2ScrubberRating = processDiagnostics(bitSize, data, "scrubber");

  return oxygenGeneratorRating * co2ScrubberRating;
};
