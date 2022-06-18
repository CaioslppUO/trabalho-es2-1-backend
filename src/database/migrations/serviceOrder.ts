import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("ServiceOrder", (tbl) => {
    tbl.increments("id", { primaryKey: true }).notNullable();
    tbl
      .integer("idClient")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Client");
    tbl
      .integer("idPhone")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Phone");
    tbl.string("model", 255).notNullable();
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("ServiceOrder");
};
