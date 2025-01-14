import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";

import {toNumber} from "@common/transformers";

import {characterTable, baseStatsTable} from "./db.schema";

export const createCharacterDTO = createInsertSchema(characterTable)
  .omit({id: true})
  .extend({
    name: z.string().max(20),
    baseStats: createInsertSchema(baseStatsTable)
      .omit({characterId: true})
      .extend({
        strength: z.number().max(10),
        agility: z.number().max(10),
        intellect: z.number().max(10),
        perception: z.number().max(10),
        charisma: z.number().max(10)
      })
  });

export const characterSearchQueryDTO = z.object({
  id: z.string().transform(toNumber("Id should be a number")),
  name: z.string(),
  userId: z.string().transform(toNumber("User Id should be a number")),
  limit: z.string().transform(toNumber("Limit should be a number"))
}).partial().strict("Invalid query");

export const characterIdUrlParamDTO = characterSearchQueryDTO.pick({id: true});

export type CharacterSearchQueryDTO = z.infer<typeof characterSearchQueryDTO>;
export type CharacterIdUrlParamDTO = z.infer<typeof characterIdUrlParamDTO>;
export type CreateCharacterDTO = z.infer<typeof createCharacterDTO>;
