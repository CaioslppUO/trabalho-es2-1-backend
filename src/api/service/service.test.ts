import { Service } from "./service";
import { database } from "../knex/knex";

describe("Test the service database operations", () => {
  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let service = Service();

  test("Should insert a service", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .insert("Novo Serviço", 20.23)
      .then((res) => {
        return service
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
      type: "Novo Serviço",
      price: 20.23,
      deleted: 0,
    });
  });

  test("Should delete a service", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .remove(1)
      .then(() => {
        return service
          .findOne(1)
          .then((res) => {
            return res[0];
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.deleted).not.toBe("undefined");
    expect(res.deleted).toEqual(1);
  });

  test("Should select on service", async () => {
    await database("Service").truncate();
    await database.seed.run();
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

  test("Should select all services", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(5);
  });

  test("Should update a service", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .update(1, "Novo Serviço", 4.99)
      .then(() => {
        return service
          .findOne(1)
          .then((res) => res[0])
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({
      id: 1,
      type: "Novo Serviço",
      price: 4.99,
      deleted: 0,
    });
  });

  test("Should not insert duplicated service type", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .insert("Troca de Tela", 13.55)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert empty service type", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .insert("", 10.55)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("service type must not be empty");
  });
});
