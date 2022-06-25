import { Client } from "./client";
import { database } from "../knex/knex";

describe("Test the client database operations", () => {
  let client = Client();

  test("Should insert a client", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Client ORDER BY id DESC LIMIT 1;"
    );
    let res = await client
      .insert("Novo Cliente", "newclient@gmail.com", "99345678910", true)
      .then((res) => res.id)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should consult a client", async () => {
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
    let res = await client
      .remove(2, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should update a client", async () => {
    let res = await client
      .update(2, "Novo Nome", "novoemail@gmail.com", "77345678910", true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(1);
  });

  test("Should not insert client with duplicated cpf", async () => {
    let res = await client
      .insert("Luiz Afonso", "luizafonso@gmail.com", "12345678910", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert client with duplicated email", async () => {
    let res = await client
      .insert("Albertinho", "caioslppuo@gmail.com", "12344678910", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert not valid cpf", async () => {
    let res = await client
      .insert("JoseDeSouza", "lala@gmail.com", "1", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid cpf size");
  });

  test("Should not insert a not valid email", async () => {
    let res = await client
      .insert("Jubileu", "@gmail.com", "12345668910", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid email");
  });

  test("Should not insert a empty name client", async () => {
    let res = await client
      .insert("", "empty@email.com", "22345678910", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("client name must not be empty");
  });
});
