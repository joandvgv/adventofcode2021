import { TransformType } from "../types";
import { readFile } from "./../utils/utils";

const transformFunctions: {
  [key in TransformType]: (value: string) => unknown;
} = {
  generic: (value: string) => parseInt(value.trim()),
  tuple: (value: string) => {
    return { ...value.trim().split(" ") };
  },
  binary: (value: string) => value.trim().split(""),
};

export const processInput = async <T>(
  fileName: string,
  day: number,
  transformType: TransformType = "generic"
) => {
  const transformFunction = transformFunctions[transformType];

  const { data } = await readFile<T>(
    __dirname + `/day${day}/` + fileName,
    transformFunction
  );

  return data;
};
