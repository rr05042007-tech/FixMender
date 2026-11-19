const fs = require('node:fs/promises');
const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MIGRATIONS_DIRECTORY = path.resolve(__dirname, '../migrations');
const MIGRATION_LOCK_ID = 24815631;

async function runMigrations(pool, migrationsDirectory = MIGRATIONS_DIRECTORY) {
  const client = await pool.connect();
  let lockAcquired = false;

  try {
    await client.query('SELECT pg_advisory_lock($1)', [MIGRATION_LOCK_ID]);
    lockAcquired = true;

    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        migration_name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    const files = (await fs.readdir(migrationsDirectory))
      .filter((file) => /^\d+_[a-z0-9_-]+\.sql$/i.test(file))
      .sort();
    const result = await client.query(
      'SELECT migration_name FROM schema_migrations'
    );
    const appliedMigrations = new Set(
      result.rows.map((row) => row.migration_name)
    );
    const appliedNow = [];

    for (const file of files) {
      if (appliedMigrations.has(file)) {
        continue;
      }

      const migration = await fs.readFile(
        path.join(migrationsDirectory, file),
        'utf8'
      );

      await client.query('BEGIN');
      try {
        await client.query(migration);
        await client.query(
          'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
          [file]
        );
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw new Error(`Failed to apply migration ${file}: ${error.message}`, {
          cause: error,
        });
      }

      appliedNow.push(file);
    }

    return appliedNow;
  } finally {
    try {
      if (lockAcquired) {
        await client.query('SELECT pg_advisory_unlock($1)', [
          MIGRATION_LOCK_ID,
        ]);
      }
    } finally {
      client.release();
    }
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is required. Set it in the root .env file before running migrations.'
    );
  }

  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const applied = await runMigrations(pool);
    if (applied.length === 0) {
      console.log('Database is already up to date.');
    } else {
      console.log(`Applied ${applied.length} migration(s): ${applied.join(', ')}`);
    }
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('Database migration failed:', error);
    process.exitCode = 1;
  });
}

module.exports = { runMigrations };
