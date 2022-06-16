import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('permission', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.string('label', 20).notNullable().unique();
        t.string('description', 1000).notNullable();
        t.uuid('parentPermissionId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('permission')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        t.uuid('permissionSetId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('permissionSet').unique()
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('permission');
}

