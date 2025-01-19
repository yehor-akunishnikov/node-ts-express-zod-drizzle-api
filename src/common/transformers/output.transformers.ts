import {z, Schema} from "zod";

export const transformOutput = <S extends Schema>(
  schema: S,
  output: unknown
): z.infer<S> => {
  if (Array.isArray(output)) {
    return output.map(outputItem => schema.parse(outputItem));
  } else {
    return schema.parse(output);
  }
};
