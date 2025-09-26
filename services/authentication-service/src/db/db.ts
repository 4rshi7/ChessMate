import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Use the PoolConfig interface for type-checking the configuration object.
const poolConfig: PoolConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
};

// The 'pool' constant is automatically typed as 'Pool' by TypeScript.
const pool = new Pool(poolConfig);

pool.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL database");
  })
  .catch((err: Error) => { // Explicitly type the error object.
    console.error("❌ Connection error", err.stack);
  });

export default pool;



