import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

/**
 * Runs a basic `SELECT 1` with retry logic to ensure PostgreSQL is reachable.
 * @param {number} [retries=5] Maximum retry attempts before failing.
 * @param {number} [delayMs=2000] Delay in milliseconds between retries.
 * @returns {Promise<void>} Resolves when a connection succeeds, rejects after exhausting retries.
 */
async function checkDatabaseConnection(retries = 5, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query('SELECT 1');
      console.log('Database connection OK');
      return;
    } catch (err) {
      console.error(
        `Database connection error (attempt ${attempt}/${retries}):`,
        err.message
      );
      if (attempt === retries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

/**
 * Convenience wrapper around `pool.query` used by controllers.
 * @param {string} text SQL statement.
 * @param {unknown[]} [params] Parameter values.
 * @returns {Promise<import('pg').QueryResult>} Query result promise.
 */
export const query = (text, params) => pool.query(text, params);
export { pool, checkDatabaseConnection };