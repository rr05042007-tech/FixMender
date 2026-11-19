const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { runMigrations } = require('./migrate');

class FakeClient {
  constructor() {
    this.appliedMigrations = [];
    this.migrationSql = [];
    this.released = false;
  }

  async query(sql, values = []) {
    const statement = sql.trim();

    if (statement.startsWith('SELECT migration_name FROM schema_migrations')) {
      return {
        rows: this.appliedMigrations.map((migration_name) => ({
          migration_name,
        })),
      };
    }

    if (statement.startsWith('INSERT INTO schema_migrations')) {
      this.appliedMigrations.push(values[0]);
    } else if (
      statement.startsWith('CREATE TABLE IF NOT EXISTS sos_requests')
    ) {
      this.migrationSql.push(statement);
    }

    return { rows: [] };
  }

  release() {
    this.released = true;
  }
}

test('applies pending migrations once and releases the database client', async () => {
  const client = new FakeClient();
  const pool = { connect: async () => client };
  const migrationsDirectory = path.resolve(__dirname, '../migrations');

  const applied = await runMigrations(pool, migrationsDirectory);
  const rerun = await runMigrations(pool, migrationsDirectory);

  assert.deepEqual(applied, ['001_create_sos_requests.sql']);
  assert.deepEqual(rerun, []);
  assert.equal(client.migrationSql.length, 1);
  assert.equal(client.released, true);
});
