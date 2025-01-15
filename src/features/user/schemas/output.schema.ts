import {z} from "zod";

import {ebcOmit} from "@common/utils";

export const userOutputDTO = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string()
}).transform(
  user => ebcOmit(user, ["password"])
);

export type UserOutputDTO = z.infer<typeof userOutputDTO>;
