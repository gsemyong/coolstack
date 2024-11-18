import * as schema from "@/db/schema";
import { env } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema,
});
