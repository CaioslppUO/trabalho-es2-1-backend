import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("Client", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl.string("name", 255).notNullable();
    tbl.string("email", 255).notNullable().unique();
    tbl.string("cpf", 45).notNullable().unique();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("Client");
};
