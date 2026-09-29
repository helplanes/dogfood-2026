import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_ADMIN ?? process.env.DATABASE_URL });
  await migrate(drizzle(pool), { migrationsFolder: "db/migrations" });
  await pool.end();
  console.log("migrations applied");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
