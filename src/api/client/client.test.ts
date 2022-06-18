import { Client } from "./client";

describe("Test the client database operations", () => {
  test("Should select all clients", () => {
    let client = Client();
    client.find().then((res) => {
      expect(res.length).toBeGreaterThanOrEqual(5);
      expect(Object.keys(res[0]).sort()).toEqual(
        ["id", "name", "email", "cpf"].sort()
      );
    });
  });

  test("Should select a client", () => {
    let client = Client();
    client.findOne(1).then((res) => {
      expect(res[0]).toEqual({
        id: 1,
        name: "Caio Cezar das Neves Moreira",
        email: "caioslppuo@gmail.com",
        cpf: "12345678910",
      });
    });
  });

  test("Should insert a client", () => {
    let client = Client();
    client.insert("Nelson", "nelsinho@gmail.com", "12345678916").then((res) => {
      client.findOne(res.id).then((res2) => {
        expect(res2[0]).toEqual({
          id: res.id,
          name: "Nelson",
          email: "nelsinho@gmail.com",
          cpf: "12345678916",
        });
      });
    });
  });

  test("Should delete a client", () => {
    let client = Client();
    client.remove(3).then((res) => {
      client.findOne(3).then((res2) => {
        expect(res2).toEqual([]);
      });
    });
  });

  test("Should update a client", () => {
    let client = Client();
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
      });
  });
});
