import {fillIn as fillInPassiveSkills} from "./tables/passive-skills";
import {prisma} from "@config/db";

const main = async (): Promise<void> => {
  await fillInPassiveSkills();
  await prisma.$disconnect();
};

main().catch(async (e) => {
  console.error(e);

  await prisma.$disconnect();
  process.exit(1);
});
