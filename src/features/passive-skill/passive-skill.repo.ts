import {prisma} from "@config/db";

export const findMany = async () => {
  return prisma.passiveSkill.findMany();
};
