import {Command} from "commander";

import {createFeature} from "./commands/create-feature";

const program = new Command();

program
  .name("ebc")
  .description("Simple CLI utils set")
  .version("0.0.1");

program.command("create-feature")
  .description("Generates starter code for a new feature")
  .argument("name", "Feature name")
  .action(createFeature);

program.parse();
