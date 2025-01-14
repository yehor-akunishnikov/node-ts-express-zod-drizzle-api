import {int, mysqlTable, varchar} from "drizzle-orm/mysql-core";

import {userTable} from "@user-feature";

export const characterTable = mysqlTable("character", {
  id: int().primaryKey().autoincrement(),
  userId: int("user_id").references(
    () => userTable.id,
    {onDelete: "cascade"}
  ),
  name: varchar({length: 255})
});

export const baseStatsTable = mysqlTable("base_stats", {
  characterId: int("character_id").primaryKey().references(
    () => characterTable.id,
    {onDelete: "cascade"}
  ),
  strength: int().default(0).notNull(),
  agility: int().default(0).notNull(),
  intellect: int().default(0).notNull(),
  perception: int().default(0).notNull(),
  charisma: int().default(0).notNull()
});

export type Character = typeof characterTable.$inferSelect & {
  baseStats: Omit<typeof baseStatsTable.$inferSelect, "characterId"> | null;
};
