import "dotenv/config";

import {defineConfig} from "drizzle-kit";

/* Needed for migrations to work */
export default defineConfig({
  out: "./drizzle",
  schema: "./src/features/**/*.schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
