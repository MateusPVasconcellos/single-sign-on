import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subscription', (t) => {
        t.uuid('id').primary().unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.jsonb('permissions');
        t.uuid('accountId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('account')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
        t.uuid('clientId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('client')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('subscription');
}

