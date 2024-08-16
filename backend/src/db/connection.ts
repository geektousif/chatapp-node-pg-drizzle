import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DB } from "../config/env.config";

const pool = new Pool({
  host: DB.HOST,
  port: Number(DB.PORT),
  database: DB.NAME,
  user: DB.USER,
  password: DB.PASSWORD,
});

export const db = drizzle(pool);
