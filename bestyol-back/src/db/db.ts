// db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { users } from "./schema/users";

// example values
const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "db_name",
});

const db = drizzle(pool);

const allUsers = await db.select().from(users);
