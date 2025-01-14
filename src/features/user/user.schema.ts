import {int, mysqlTable, varchar} from "drizzle-orm/mysql-core";
import {createSelectSchema} from "drizzle-zod";
import {z} from "zod";

import {passwordRegexp} from "@common/regexp-patterns";
import {toNumber} from "@common/transformers";

export const userTable = mysqlTable("user", {
  id: int().primaryKey().autoincrement(),
  name: varchar({length: 255}),
  email: varchar({length: 255}).notNull().unique(),
  password: varchar({length: 255}).notNull()
});

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

export const userOutputDTO = createSelectSchema(userTable).transform(
  ({name, id, email}) => ({name, id, email})
);

export type User = typeof userTable.$inferSelect;
export type UserSearchQueryDTO = z.infer<typeof userSearchQueryDTO>;
export type UpdateUserDTO = z.infer<typeof updateUserDTO>;
export type UserIdUrlParamDTO = z.infer<typeof userIdUrlParamDTO>;
export type UserOutputDTO = z.infer<typeof userOutputDTO>;
