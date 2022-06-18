import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("Client").del();

  // Inserts seed entries
  await knex("Client").insert([
    {
      id: 1,
      name: "Caio Cezar das Neves Moreira",
      email: "caioslppuo@gmail.com",
      cpf: "12345678910",
    },
    {
      id: 2,
      name: "Lucas Garavaglia",
      email: "lucasgrafimar@gmail.com",
      cpf: "12345678911",
    },
    {
      id: 3,
      name: "Leví Cícero Arcanjo",
      email: "arcanjolevi@gmail.com",
      cpf: "12345678912",
    },
    {
      id: 4,
      name: "Guilherme Bachega Gomes",
      email: "guizobachegagomes@gmail.com",
      cpf: "12345678913",
    },
    {
      id: 5,
      name: "Milena Santos",
      email: "mii.santos342@gmail.com",
      cpf: "12345678914",
    },
  ]);
}
