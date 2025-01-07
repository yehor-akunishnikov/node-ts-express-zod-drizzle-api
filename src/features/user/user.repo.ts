import {and, eq, SQL, sql} from "drizzle-orm";

import {db} from "@config/db";

import {UpdateUserDTO, User, UserSearchQueryDTO, usersTable} from "./user.schema";

export const find = (
	queryParams: UserSearchQueryDTO
): Promise<User[]> => {
	const searchStatements: SQL[] = [];

	if (queryParams.id) {
		searchStatements.push(eq(usersTable.id, queryParams.id));
	}
	if (queryParams.email) {
		searchStatements.push(sql`email like ${`%${queryParams.email}%`}`);
	}
	if (queryParams.name) {
		searchStatements.push(sql`name like ${`%${queryParams.name}%`}`);
	}

	return db
		.select()
		.from(usersTable)
		.where(and(...searchStatements))
		.limit(queryParams.limit ?? 100);
};

export const addOne = async (
	payload: Pick<User, "email" | "password">
): Promise<void> => {
	await db.insert(usersTable).values(payload);
};

/* TODO: Should be a transaction (To investigate) */
export const update = async (
	id: number,
	payload: UpdateUserDTO
): Promise<void> => {
	await db.update(usersTable).set(payload).where(eq(usersTable.id, id));
};
