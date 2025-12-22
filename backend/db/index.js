import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('Database connection OK');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
}

export const query = (text, params) => pool.query(text, params);
export { pool, checkDatabaseConnection };