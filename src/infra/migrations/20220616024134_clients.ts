import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('client', (t) => {
        t.uuid('id').unique().defaultTo(knex.raw('uuid_generate_v4()'));
        t.timestamps(true, true);
        t.string('description', 1000).notNullable();
        t.jsonb('authenticationFlow');
        t.uuid('tenantId').defaultTo(knex.raw('uuid_generate_v4()'))
            .references('id').inTable('tenant')
            .unsigned().onUpdate('CASCADE').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tenant');
}
