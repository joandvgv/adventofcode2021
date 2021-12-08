import { processInput } from "../utils";

type Direction = "forward" | "down" | "up";
type Position = "horizontal" | "depth";
type Action = "+" | "-";

export const solve = async (testMode = false) => {
  const fileName = `/${testMode ? "test-" : ""}input.csv`;

  const data = await processInput<{
    0: Direction;
    1: string;
  }>(fileName, 2, "tuple");

  type ActionMap = {
    [key in Direction]: {
      type: Position;
      action: Action;
    };
  };

  const actionMap: ActionMap = {
    forward: {
      type: "horizontal",
      action: "+",
    },
    up: {
      type: "depth",
      action: "-",
    },
    down: {
      type: "depth",
      action: "+",
    },
  };

  const { horizontal, depth } = data.reduce(
    (acc, { 0: direction, 1: value }) => {
      const { type, action } = actionMap[direction];
      const units = parseInt(value);

      acc[type] = eval(acc[type] + action + units);
      return acc;
    },
    {
      horizontal: 0,
      depth: 0,
    }
  );
  return horizontal * depth;
};
