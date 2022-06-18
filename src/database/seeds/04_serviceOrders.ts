import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("ServiceOrder").del();

  // Inserts seed entries
  await knex("ServiceOrder").insert([
    { id: 1, idClient: 1, idPhone: 3 },
    { id: 2, idClient: 2, idPhone: 2 },
    { id: 3, idClient: 3, idPhone: 4 },
    { id: 4, idClient: 4, idPhone: 1 },
    { id: 5, idClient: 1, idPhone: 5 },
  ]);
}
