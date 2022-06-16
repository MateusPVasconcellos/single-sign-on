/* eslint-disable indent */
export const development = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    port: 5433,
    database: 'gc-database',
    user: 'postgres',
    password: 'postgres'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/infra/migrations',
    extension: 'ts'
  }
};
