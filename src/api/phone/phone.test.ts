import { Phone } from "./phone";
import { database } from "../knex/knex";

describe("Test the phone database operations", () => {
  let phone = Phone();

  test("Should insert a phone", async () => {
    let tblLastIndex = await database.raw(
      "SELECT id from Phone ORDER BY id DESC LIMIT 1;"
    );
    let res = await phone
      .insert("Novo Modelo", true)
      .then((res) => res.id)
      .catch((err) => err);
    expect(res).toBe(tblLastIndex[0].id + 1);
  });

  test("Should delete a phone", async () => {
    let res = await phone
      .remove(2, true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(1);
  });

  test("Should select a phone", async () => {
    let res = await phone
      .findOne(3)
      .then((res) => {
        return res[0];
      })
      .catch((err) => err);
    expect(res).toEqual({ id: 3, model: "Samsung" });
  });

  test("Should select all phones", async () => {
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
    let res = await phone
      .update(1, "Novo Modelo", true)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(1);
  });

  test("Should not insert a duplicated model", async () => {
    let res = await phone
      .insert("Xiaomi", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert an empty model", async () => {
    let res = await phone
      .insert("", true)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });
});
