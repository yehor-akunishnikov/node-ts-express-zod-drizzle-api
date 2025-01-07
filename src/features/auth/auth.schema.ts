import {z} from "zod";

import {passwordRegexp} from "@common/regexp-patterns";

export const registerDto = z.object({
	email: z.string().email({message: "Invalid email"}),
	password: z.string().refine(
		(value) => passwordRegexp.test(value ?? ""),
		"Weak password"
	),
}).strict("Invalid payload");

export const loginDto = z.object({
	email: z.string(),
	password: z.string(),
}).strict("Invalid payload");

export type RegisterDto = z.infer<typeof registerDto>;
export type LoginDto = z.infer<typeof loginDto>;
