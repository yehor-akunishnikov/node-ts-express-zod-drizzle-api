import {z} from "zod";

import {passwordRegexp} from "@common/regexp-patterns";

export const registerDTO = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().refine(
    (value) => passwordRegexp.test(value ?? ""),
    "Weak password"
  )
}).strict("Invalid payload");

export const loginDTO = z.object({
  email: z.string(),
  password: z.string()
}).strict("Invalid payload");

export type RegisterDTO = z.infer<typeof registerDTO>;
export type LoginDTO = z.infer<typeof loginDTO>;
