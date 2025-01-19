import * as passiveSkillRepo from "./passive-skill.repo";

export const findMany = async () => {
  return passiveSkillRepo.findMany();
};
