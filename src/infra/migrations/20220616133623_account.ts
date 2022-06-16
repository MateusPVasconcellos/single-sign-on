import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('account', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.boolean('active').notNullable().defaultTo(false);
        t.timestamps(true, true);
        t.string('email', 100).unique();
        t.jsonb('attributes');
        t.uuid('tenantId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('tenant')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('account');
}