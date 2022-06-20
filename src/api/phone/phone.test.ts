import { Phone } from "./phone";
import { database } from "../knex/knex";

describe("Test the phone database operations", () => {
  jest.setTimeout(100000);

  afterAll(async () => {
    await database("Phone").truncate();
    await database.seed.run();
  });

  let phone = Phone();

  test("Should insert a phone", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .insert("Novo Modelo")
      .then((res) => {
        return phone
          .findOne(res.id)
          .then((res2) => {
            res2.id = res.id;
            return res2[0];
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({ id: res.id, model: "Novo Modelo" });
  });

  test("Should delete a phone", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .remove(2)
      .then(() => {
        return phone
          .findOne(2)
          .then((res2) => {
            return res2;
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(0);
  });

  test("Should select a phone", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .findOne(3)
      .then((res) => {
        return res[0];
      })
      .catch((err) => err);
    expect(res).toEqual({ id: 3, model: "Samsung" });
  });

  test("Should select all phones", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .find()
      .then((res) => {
        return res;
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(7);
  });

  test("Should update a phone", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .update(1, "Novo Modelo")
      .then(() => {
        return phone
          .findOne(1)
          .then((res) => res[0])
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({ id: 1, model: "Novo Modelo" });
  });

  test("Should not insert a duplicated model", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .insert("Xiaomi")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert an empty model", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .insert("")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });
});
