import { Pool } from 'pg';

// We reuse a single pool across the app
declare global {
  var _pgPool: Pool | undefined;
}

let pool: Pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/caplore_db',
  });
}

pool = global._pgPool;

export default pool;
