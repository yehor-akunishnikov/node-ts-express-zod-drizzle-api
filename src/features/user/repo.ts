import {DatabaseError, QueryResult} from "pg";
import {eq} from "drizzle-orm";

import {tryCatch} from "@common/utils/helpers";
import {LQResult} from "@common/types/utils";
import {RegisterPayload} from "@auth/types";
import {db} from "@config/db";

import {usersTable} from "./schema";
import {RawUser} from "./types";

export const create = (
  payload: RegisterPayload
): Promise<LQResult<DatabaseError, QueryResult<never>>> => {
  return tryCatch<
    DatabaseError,
    QueryResult<never>
  >(
    db.insert(usersTable)
      .values(payload)
  );
};

export const findOneByEmail = (
  email: string
): Promise<LQResult<DatabaseError, RawUser>> => {
  return tryCatch<
    DatabaseError,
    RawUser
  >(
    db.select()
      .from(usersTable)
      .limit(1)
      .where(eq(usersTable.email, email))
      .then(users => users[0])
  );
};

export const findOneById = (
  userId: number
): Promise<LQResult<DatabaseError, RawUser>> => {
  return tryCatch<
    DatabaseError,
    RawUser
  >(
    db.select()
      .from(usersTable)
      .limit(1)
      .where(eq(usersTable.id, userId))
      .then(users => users[0])
  );
};
