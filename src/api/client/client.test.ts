import { Client } from "./client";
import { database } from "../knex/knex";

describe("Test the client database operations", () => {
  jest.setTimeout(100000);

  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let client = Client();

  test("Should insert a client", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .insert("Novo Cliente", "newclient@gmail.com", "99345678910")
      .then((res) => {
        return client
          .findOne(res.id)
          .then((res2) => {
            res2.id = res.id;
            return res2[0];
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({
      id: res.id,
      name: "Novo Cliente",
      email: "newclient@gmail.com",
      cpf: "99345678910",
    });
  });

  test("Should consult a client", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .findOne(1)
      .then((res) => res[0])
      .catch((err) => err);
    expect(res).toEqual({
      id: 1,
      name: "Caio Cezar das Neves Moreira",
      email: "caioslppuo@gmail.com",
      cpf: "12345678910",
    });
  });

  test("Should consult all clients", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .find()
      .then((res) => {
        return res;
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(5);
  });

  test("Should delete a client", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .remove(2)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should update a client", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await client
      .update(2, "Novo Nome", "novoemail@gmail.com", "77345678910")
      .then((res) => {
        return client.findOne(2).then((res2) => res2[0]);
      })
      .catch((err) => err);
    expect(res).toEqual({
      id: 2,
      name: "Novo Nome",
      email: "novoemail@gmail.com",
      cpf: "77345678910",
    });
  });

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
