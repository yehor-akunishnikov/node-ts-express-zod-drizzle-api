import {z} from "zod";

import {toNumber} from "@common/transformers";

export const createCharacterDTO = z.object({
  baseStats: z.object({
    STRENGTH: z.number().max(20),
    DEXTERITY: z.number().max(20),
    INTELLECT: z.number().max(20),
    PERCEPTION: z.number().max(20),
    CHARISMA: z.number().max(20)
  }),
  passiveSkills: z.record(z.string(), z.number().max(4)),
  healthPoints: z.object({
    total: z.number(),
    current: z.number()
  }),
  profile: z.object({
    name: z.string().max(30),
    specialties: z.string().max(2000),
    inventory: z.string().max(2000),
    description: z.string().max(2000)
  }),
  state: z.enum(["DRAFT", "PUBLISHED"]).optional()
}).strict("Invalid payload");

export const updateCharacterDTO = createCharacterDTO.extend({
  baseStats: z.object({
    STRENGTH: z.number().max(20),
    DEXTERITY: z.number().max(20),
    INTELLECT: z.number().max(20),
    PERCEPTION: z.number().max(20),
    CHARISMA: z.number().max(20)
  }).partial(),
  healthPoints: z.object({
    total: z.number(),
    current: z.number()
  }).partial(),
  profile: z.object({
    name: z.string().max(30),
    specialties: z.string().max(2000),
    inventory: z.string().max(2000),
    description: z.string().max(2000)
  }).partial()
}).partial();

export const characterSearchQueryDTO = z.object({
  id: z.string().transform(toNumber("Id should be a number")),
  author_id: z.string().transform(toNumber("Author id should be a number")),
  name: z.string(),
  state: createCharacterDTO.shape.state,
  limit: z.string().transform(toNumber("Limit should be a number"))
}).partial().strict("Invalid query");

export const characterIdUrlParamDTO = characterSearchQueryDTO.pick({id: true});

export type ManyCharactersSearchQueryDTO = z.infer<typeof characterSearchQueryDTO>;
export type OneCharacterSearchQueryDTO = Omit<z.infer<typeof characterSearchQueryDTO>, "limit">;
export type CharacterIdUrlParamDTO = z.infer<typeof characterIdUrlParamDTO>;
export type CreateCharacterDTO = z.infer<typeof createCharacterDTO>;
export type UpdateCharacterDTO = z.infer<typeof updateCharacterDTO>;
