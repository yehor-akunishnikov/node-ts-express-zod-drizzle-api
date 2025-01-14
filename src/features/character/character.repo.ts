import {and, eq, SQL, sql, getTableColumns} from "drizzle-orm";

import {db} from "@config/db";

import {Character} from "@character-feature";

import {CharacterSearchQueryDTO, CreateCharacterDTO} from "./schema/validation.schema";
import {characterTable, baseStatsTable} from "./schema/db.schema";

/**
 * TODO:
 * - Read the DOC and find out how to optimize queries
 * - Remove duplicates, make code reusable */

export const find = (
  queryParams: CharacterSearchQueryDTO
): Promise<Character[]> => {
  const searchStatements: SQL[] = [];

  if (queryParams.id) {
    searchStatements.push(eq(characterTable.id, queryParams.id));
  }
  if (queryParams.name) {
    searchStatements.push(sql`name like
    ${`%${queryParams.name}%`}`);
  }

  return db
    .select({
      ...getTableColumns(characterTable),
      baseStats: getTableColumns(baseStatsTable)
    })
    .from(characterTable)
    .leftJoin(baseStatsTable, eq(characterTable.id, baseStatsTable.characterId))
    .where(and(...searchStatements))
    .limit(queryParams.limit ?? 100);
};

export const create = async(
  {baseStats, ...characterData}: CreateCharacterDTO
): Promise<Character> => {
  return db.transaction(async (tx) => {
    try {
      const characterId = await tx
        .insert(characterTable)
        .values(characterData)
        .$returningId()
        .then((data) => data[0].id);

      await tx
        .insert(baseStatsTable)
        .values({...baseStats, characterId});

      return tx
        .select({
          ...getTableColumns(characterTable),
          baseStats: getTableColumns(baseStatsTable)
        })
        .from(characterTable)
        .leftJoin(baseStatsTable, eq(characterTable.id, baseStatsTable.characterId))
        .where(eq(characterTable.id, characterId))
        .limit(1)
        .then((data) => data[0]);
    } catch (e) {
      tx.rollback();
      throw e;
    }
  });
};
