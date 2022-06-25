import { Service } from "./service";
import { database } from "../knex/knex";

describe("Test the service database operations", () => {
  let service = Service();

  test("Should insert a service", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Service ORDER BY id DESC LIMIT 1;"
    );
    let res = await service
      .insert("Novo Serviço", 20.23, true)
      .then((res) => res.id)
      .catch((err) => err);
    let newTblLastIndex = await database.raw(
      "SELECT id from Service ORDER BY id DESC LIMIT 1;"
    );
    expect(res).toBe(tblLastIndex[0].id + 1);
    expect(newTblLastIndex[0].id).toBe(tblLastIndex[0].id);
  });

  test("Should delete a service", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Service ORDER BY id DESC LIMIT 1;"
    );
    let res = await service
      .remove(1, true)
      .then((res) => res)
      .catch((err) => err);
    let newTblLastIndex = await database.raw(
      "SELECT id from Service ORDER BY id DESC LIMIT 1;"
    );
    expect(res).toBe(1);
    expect(newTblLastIndex[0].id).toBe(tblLastIndex[0].id);
  });

  test("Should select on service", async () => {
    let res = await service
      .findOne(2)
      .then((res) => res[0])
      .catch((err) => err);
    expect(res).toEqual({
      id: 2,
      type: "Troca de Tela",
      price: 120.99,
      deleted: 0,
    });
  });

  test("Should select on service order by model phone", async () => {
    let res = await service
      .findRankServiceByModel()
      .then((res) => res)
      .catch((err) => err);
    expect(res.sort()).toEqual(
      [
        { id: 1, type: "Colocar Película", price: 33.5, deleted: 0, OS: 2 },
        { id: 2, type: "Troca de Tela", price: 120.99, deleted: 0, OS: 1 },
        { id: 3, type: "Trocar Bateria", price: 34.99, deleted: 0, OS: 1 },
        { id: 4, type: "Limpeza", price: 19.99, deleted: 0, OS: 1 },
        { id: 5, type: "Remover Vírus", price: 29.99, deleted: 0, OS: 0 },
      ].sort()
    );
  });

  test("Should select all services", async () => {
    let res = await service
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(5);
  });

  test("Should update a service", async () => {
    let res = await service
      .update(1, "Novo Serviço", 4.99, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(1);
  });

  test("Should not insert duplicated service type", async () => {
    let res = await service
      .insert("Troca de Tela", 13.55, true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert empty service type", async () => {
    let res = await service
      .insert("", 10.55, true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("service type must not be empty");
  });
});
