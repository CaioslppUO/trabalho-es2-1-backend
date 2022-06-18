import { Client } from "./client";
import { database } from "../knex/knex";

describe("Test the client database operations", () => {
  let client = Client();

  test("Should select all clients", () => {
    client
      .find()
      .then((res) => {
        expect(res.length).toBeGreaterThanOrEqual(5);
        expect(Object.keys(res[0]).sort()).toEqual(
          ["id", "name", "email", "cpf"].sort()
        );
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should select a client", () => {
    client
      .findOne(1)
      .then((res) => {
        expect(res[0]).toEqual({
          id: 1,
          name: "Caio Cezar das Neves Moreira",
          email: "caioslppuo@gmail.com",
          cpf: "12345678910",
        });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should insert a client", () => {
    client.insert("Nelson", "nelsinho@gmail.com", "12345678916").then((res) => {
      client
        .findOne(res.id)
        .then((res2) => {
          expect(res2[0]).toEqual({
            id: res.id,
            name: "Nelson",
            email: "nelsinho@gmail.com",
            cpf: "12345678916",
          });
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should delete a client", () => {
    client.remove(3).then((res) => {
      client
        .findOne(3)
        .then((res2) => {
          expect(res2).toEqual([]);
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should update a client", () => {
    client
      .update(4, "Seu Jorge", "jorginho@gmail.com", "12345678919")
      .then((res) => {
        client.findOne(4).then((res2) => {
          expect(res2[0]).toEqual({
            id: 4,
            name: "Seu Jorge",
            email: "jorginho@gmail.com",
            cpf: "12345678919",
          });
        });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should not insert client with duplicated cpf", async () => {
    let res = await client
      .insert("Luiz Afonso", "luizafonso@gmail.com", "12345678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert client with duplicated email", async () => {
    let res = await client
      .insert("Albertinho", "caioslppuo@gmail.com", "12344678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert not valid cpf", async () => {
    let res = await client
      .insert("JoseDeSouza", "lala@gmail.com", "1")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid cpf size");
  });

  test("Should not insert a not valid email", async () => {
    let res = await client
      .insert("Jubileu", "@gmail.com", "12345668910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid email");
  });

  test("Should not insert a empty name client", async () => {
    let res = await client
      .insert("", "empty@email.com", "22345678910")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("client name must not be empty");
  });
});
