import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("ServiceOrderHasService").del();

  // Inserts seed entries
  await knex("ServiceOrderHasService").insert([
    { idServiceOrder: 1, idService: 1 },
    { idServiceOrder: 2, idService: 2 },
    { idServiceOrder: 3, idService: 3 },
    { idServiceOrder: 4, idService: 4 },
    { idServiceOrder: 5, idService: 4 },
  ]);
}
