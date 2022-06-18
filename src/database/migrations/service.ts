import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Service", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.string("type", 255).notNullable().unique();
    tbl.decimal("price", 9).notNullable();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Service");
};
