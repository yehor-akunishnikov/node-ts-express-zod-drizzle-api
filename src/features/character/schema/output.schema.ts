import {createSelectSchema, createInsertSchema} from "drizzle-zod";
import {z} from "zod";

import {characterTable, baseStatsTable} from "./db.schema";

export const characterOutputDTO = createSelectSchema(characterTable)
  .extend({
    baseStats: createInsertSchema(baseStatsTable)
  })
  .transform((data) => ({
    ...data,
    baseStats: {
      strength: data.baseStats.strength,
      agility: data.baseStats.strength,
      intellect: data.baseStats.strength,
      perception: data.baseStats.strength,
      charisma: data.baseStats.strength
    }
  }));

export type CharacterOutputDTO = z.infer<typeof characterOutputDTO>;
