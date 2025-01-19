import {prisma} from "@config/db";

export const findMany = () => {
  return prisma.passiveSkill.findMany();
};
