import { Client } from "./client";
import { database } from "../knex/knex";

describe("Test the client database operations", () => {
  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let client = Client();

  test("Should not insert client with duplicated cpf", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("Luiz Afonso", "luizafonso@gmail.com", "12345678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert client with duplicated email", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("Albertinho", "caioslppuo@gmail.com", "12344678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert not valid cpf", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("JoseDeSouza", "lala@gmail.com", "1")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid cpf size");
  });

  test("Should not insert a not valid email", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("Jubileu", "@gmail.com", "12345668910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid email");
  });

  test("Should not insert a empty name client", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("", "empty@email.com", "22345678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("client name must not be empty");
  });
});
