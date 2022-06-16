import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('permissionSet', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.string('description', 1000).notNullable();
        t.uuid('tenantId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('tenant')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        t.uuid('clientId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('client')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('permissionSet');
}

