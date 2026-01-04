import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";


// Check for Database URL
if (!ENV.DATABASE_URL) {
    throw new Error("DB_URL is not set in environment variables");
}

// Initializing PostgreSQL connection pool
// Pooling is fast because it cache connection to server faster than closing and opening server everytime
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// Logging connection
pool.on("connect", () => {
    console.log("Database connected ✅");
})
// Logging error
pool.on("error", (err) => {
    console.log("❌ Database connection error:", err);
});

export const db = drizzle({ client:pool, schema });