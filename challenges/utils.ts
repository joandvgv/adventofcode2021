import { readFile } from "./../utils/utils";

export const processInput = async (fileName: string) => {
  const transformFunction = (value: string) => parseInt(value.trim());

  const { data } = await readFile<number>(
    __dirname + fileName,
    transformFunction
  );

  return data;
};
