import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Phone", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.string("model", 255).notNullable().unique();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Phone");
};
