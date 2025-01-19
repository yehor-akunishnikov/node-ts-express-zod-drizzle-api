import {z} from "zod";

export const passiveSkillOutputDTO = z.object({
  name: z.string(),
  category: z.enum(["STRENGTH", "DEXTERITY", "INTELLECT", "PERCEPTION", "CHARISMA"]),
  description: z.string()
}).transform(data => data);

export type PassiveSkillOutputDTO = z.infer<typeof passiveSkillOutputDTO>;
