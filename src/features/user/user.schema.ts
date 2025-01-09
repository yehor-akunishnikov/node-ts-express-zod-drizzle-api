import {int, mysqlTable, varchar} from "drizzle-orm/mysql-core";
import {createSelectSchema} from "drizzle-zod";
import {z} from "zod";

import {passwordRegexp} from "@common/regexp-patterns";
import {toNumber} from "@common/transformers";

export const usersTable = mysqlTable("users_table", {
  id: int().primaryKey().autoincrement(),
  name: varchar({length: 255}),
  email: varchar({length: 255}).notNull().unique(),
  password: varchar({length: 255}).notNull()
});
export type User = typeof usersTable.$inferSelect;

export const userSearchQueryDTO = z.object({
  id: z.string().transform(toNumber("Id should be a number")),
  name: z.string(),
  email: z.string(),
  limit: z.string().transform(toNumber("Limit should be a number"))
}).partial().strict("Invalid query");
export type UserSearchQueryDTO = z.infer<typeof userSearchQueryDTO>;

export const updateUserDTO = z.object({
  name: z.string().max(25),
  email: z.string().email({message: "Invalid email"}),
  password: z.string().refine(
    (value) => passwordRegexp.test(value ?? ""),
    "Weak password"
  )
}).partial().strict("Invalid payload");
export type UpdateUserDTO = z.infer<typeof updateUserDTO>;

export const userIdUrlParamDto = userSearchQueryDTO.pick({id: true});
export type UserIdUrlParamDto = z.infer<typeof userIdUrlParamDto>;

export const userOutputDTO = createSelectSchema(usersTable).transform(
  ({name, id, email}) => ({name, id, email})
);
