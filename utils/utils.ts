import fs from "fs";
import Papa from "papaparse";
import flatten from "lodash/flatten";

type ParserOutput<T> = {
  data: T[];
  meta: {
    delimiter: "," | ";";
    linebreak: "\n";
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
  errors: unknown[];
};

export const readFile = async <T>(
  path: string,
  transform?: (value: string) => unknown
) => {
  return new Promise<ParserOutput<T>>((resolve, reject) => {
    fs.readFile(path, (err, file) => {
      if (err) {
        return reject(err);
      }

      const parsed = Papa.parse(file.toString(), {
        transform,
      }) as ParserOutput<T>;
      parsed.data = flatten(parsed.data);

      resolve(parsed);
    });
  });
};
