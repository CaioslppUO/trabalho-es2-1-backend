import { Knex } from "knex";

exports.up = function (knex: Knex<any, unknown[]>) {
  return knex.schema.createTable("ServiceOrderHasService", (tbl) => {
    tbl
      .integer("idServiceOrder")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("ServiceOrder");
    tbl
      .integer("idService")
      .unsigned()
      .index()
      .notNullable()
      .references("id")
      .inTable("Service");
  });
};

exports.down = function (knex: Knex<any, unknown[]>) {
  return knex.schema.dropTableIfExists("ServiceOrderHasService");
};
