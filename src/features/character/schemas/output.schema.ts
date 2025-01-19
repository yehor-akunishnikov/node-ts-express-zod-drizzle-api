import {z} from "zod";

export const characterOutputDTO = z.object({
  id: z.number(),
  authorId: z.number(),
  name: z.string(),
  baseStats: z.record(
    z.enum(["STRENGTH", "DEXTERITY", "INTELLECT", "PERCEPTION", "CHARISMA"]),
    z.number()
  ),
  passiveSkills: z.record(z.string(), z.number()),
  healthPoints: z.object({
    total: z.number(),
    current: z.number()
  }),
  specialties: z.string(),
  inventory: z.string(),
  description: z.string(),
  state: z.enum(["DRAFT", "PUBLISHED"])
}).transform(({specialties, inventory, description, name, ...restData}) => ({
  ...restData,
  profile: {
    name,
    specialties,
    inventory,
    description
  }
}));

export type CharacterOutputDTO = z.infer<typeof characterOutputDTO>;
