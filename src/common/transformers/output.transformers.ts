import {Schema} from "zod";

export const transformOutput = <T>(
  schema: Schema,
  output: unknown
): T => {
  if (Array.isArray(output)) {
    return output.map(outputItem => schema.parse(outputItem)) as T;
  } else {
    return schema.parse(output);
  }
};
