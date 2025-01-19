import path from "node:path";
import fs from "fs";

import {Prisma, SkillCategory, PassiveSkill} from "@prisma/client";

import {prisma} from "@config/db";

export const fillIn = async () => {
  const data: Record<string, PassiveSkill[]> = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./data.json"), "utf8")
  );
  const rows: Prisma.PassiveSkillCreateInput[] = [];

  Object.entries(data).forEach(([category, skills]) => {
    skills.forEach(skill => {
      rows.push({...skill, category: category as SkillCategory});
    });
  });

  await prisma.passiveSkill.deleteMany({});
  await prisma.passiveSkill.createMany({
    data: rows
  });
};
