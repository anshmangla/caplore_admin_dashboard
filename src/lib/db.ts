import { Pool } from 'pg';

// We reuse a single pool across the app
let pool: Pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/caplore_db',
  });
}

pool = global._pgPool;

export default pool;
