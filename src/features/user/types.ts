import type {usersTable} from "./schema";

export type RawUser = typeof usersTable.$inferSelect;
