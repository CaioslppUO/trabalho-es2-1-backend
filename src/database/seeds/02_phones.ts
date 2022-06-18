import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Phone").del();

  // Inserts seed entries
  await knex("Phone").insert([
    { id: 1, model: "Xiaomi" },
    { id: 2, model: "Motorola" },
    { id: 3, model: "Samsung" },
    { id: 4, model: "Apple" },
    { id: 5, model: "Huawei" },
    { id: 6, model: "Nokia" },
    { id: 7, model: "Blue" },
  ]);
}
