import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('credential', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.string('username', 100).unique();
        t.string('password', 1000);
        t.string('credentialType', 100).notNullable();
        t.uuid('accountId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('account')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        t.uuid('tenantId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('tenant')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('credential');
}

