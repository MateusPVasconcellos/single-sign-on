import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto" schema public');
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public');
    return knex.schema.createTable('tenant', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.string('email', 100).unique();
        t.string('description', 1000);
        t.jsonb('settings');
        t.jsonb('activeKeyPair');
        t.jsonb('rotatedKeyPair');
        t.jsonb('expiredKeyPairs');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tenant');
}
