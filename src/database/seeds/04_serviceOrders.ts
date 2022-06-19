import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("ServiceOrder").del();

  // Inserts seed entries
  await knex("ServiceOrder").insert([
    {
      id: 1,
      idClient: 1,
      idPhone: 3,
      canceled: false,
      beginDate: "2022-06-13",
      endDate: "2022-07-01",
    },
    {
      id: 2,
      idClient: 2,
      idPhone: 2,
      canceled: false,
      beginDate: "2022-06-15",
      endDate: null,
    },
    {
      id: 3,
      idClient: 3,
      idPhone: 4,
      canceled: false,
      beginDate: "2022-05-18",
      endDate: "2022-06-25",
    },
    {
      id: 4,
      idClient: 4,
      idPhone: 1,
      canceled: false,
      beginDate: "2022-08-20",
      endDate: null,
    },
    {
      id: 5,
      idClient: 1,
      idPhone: 5,
      canceled: false,
      beginDate: "2022-02-01",
      endDate: "2022-04-15",
    },
  ]);
}
