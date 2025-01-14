import {and, eq, SQL, sql} from "drizzle-orm";

import {db} from "@config/db";

import {UpdateUserDTO, User, UserSearchQueryDTO, userTable} from "./user.schema";

export const find = (
  queryParams: UserSearchQueryDTO
): Promise<User[]> => {
  const searchStatements: SQL[] = [];

  if (queryParams.id) {
    searchStatements.push(eq(userTable.id, queryParams.id));
  }
  if (queryParams.email) {
    searchStatements.push(sql`email like
    ${`%${queryParams.email}%`}`);
  }
  if (queryParams.name) {
    searchStatements.push(sql`name like
    ${`%${queryParams.name}%`}`);
  }

  return db
    .select()
    .from(userTable)
    .where(and(...searchStatements))
    .limit(queryParams.limit ?? 100);
};

export const addOne = async (
  payload: Pick<User, "email" | "password">
): Promise<void> => {
  await db.insert(userTable).values(payload);
};

export const update = async (
  id: number,
  payload: UpdateUserDTO
): Promise<User> => {
  return db.transaction(async (tx) => {
    await tx.update(userTable).set(payload).where(eq(userTable.id, id));

    return tx
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1)
      .then(users => users[0]);
  });
};
