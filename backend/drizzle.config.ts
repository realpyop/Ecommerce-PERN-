import { defineConfig } from "drizzle-kit"
import { ENV } from "./src/config/env"

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    dbCredentials: {
        url: ENV.DATABASE_URL!,
    },
    out: "./drizzle",
})