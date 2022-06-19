import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Service").del();

  // Inserts seed entries
  await knex("Service").insert([
    { id: 1, type: "Colocar Película", price: 33.5, deleted: false },
    { id: 2, type: "Troca de Tela", price: 120.99, deleted: false },
    { id: 3, type: "Trocar Bateria", price: 34.99, deleted: false },
    { id: 4, type: "Limpeza", price: 19.99, deleted: false },
    { id: 5, type: "Remover Vírus", price: 29.99, deleted: false },
  ]);
}
