import { defineConfig } from "drizzle-kit";

import { DB } from "./env.config";

export default defineConfig({
  schema: "./src/db/schema/*.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: DB.HOST,
    port: Number(DB.PORT),
    database: DB.NAME!,
    user: DB.USER,
    password: DB.PASSWORD,

    ssl: false,
  },
});
