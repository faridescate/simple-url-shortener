'use strict';

exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('link');
  if (!hasTable) {
    await knex.schema.createTable('link', table => {
      table.bigIncrements('id').primary();
      table.string('address', 2048).notNullable();
      table.string('hash').nullable();
      table
        .integer('visit_count')
        .notNullable()
        .defaultTo(0);
      table.timestamps(false, true);
      table.index('hash', 'hash_index');
      table.index('address', 'address_index');
    });
  }
};

exports.down = async function(knex) {
  const hasTable = await knex.schema.hasTable("link");
  console.log('hasTable', hasTable);
  
  if (hasTable) {
    await knex.schema.raw('TRUNCATE link RESTART IDENTITY');
    await knex.schema.dropTable('link');
  }
};
