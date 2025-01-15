import {z} from "zod";

import {passwordRegexp} from "@common/regexp-patterns";
import {toNumber} from "@common/transformers";

export const userSearchQueryDTO = z.object({
  id: z.string().transform(toNumber("Id should be a number")),
  name: z.string(),
  email: z.string(),
  limit: z.string().transform(toNumber("Limit should be a number"))
}).partial().strict("Invalid query");

export const updateUserDTO = z.object({
  name: z.string().max(25),
  email: z.string().email({message: "Invalid email"}),
  password: z.string().refine(
    (value) => passwordRegexp.test(value ?? ""),
    "Weak password"
  )
}).partial().strict("Invalid payload");

export const userIdUrlParamDTO = userSearchQueryDTO.pick({id: true});

export type ManyUsersSearchQueryDTO = z.infer<typeof userSearchQueryDTO>;
export type OneUserSearchQueryDTO = Omit<ManyUsersSearchQueryDTO, "limit">;
export type UserIdUrlParamDTO = z.infer<typeof userIdUrlParamDTO>;
export type UpdateUserDTO = z.infer<typeof updateUserDTO>;
