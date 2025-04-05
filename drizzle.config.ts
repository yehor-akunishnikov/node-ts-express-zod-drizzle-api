import "dotenv/config";

import {defineConfig} from "drizzle-kit";

/* Needed for migrations to work */
export default defineConfig({
  out: "./drizzle",
  schema: "./src/features/**/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  }
});
