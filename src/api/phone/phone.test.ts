import { Phone } from "./phone";
import { database } from "../knex/knex";

describe("Test the phone database operations", () => {
  let phone = Phone();

  test("Should select all phones", () => {
    phone
      .find()
      .then((res) => {
        expect(res.length).toBeGreaterThanOrEqual(7);
        expect(Object.keys(res[0]).sort()).toEqual(["id", "model"].sort());
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should select a phone", () => {
    phone
      .findOne(1)
      .then((res) => {
        expect(res.length).toBe(1);
        expect(res[0]).toEqual({ id: 1, model: "Xiaomi" });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should insert a phone", () => {
    phone
      .insert("Ragatanga")
      .then((res) => {
        phone.findOne(res.id).then((res2) => {
          expect(res2[0]).toEqual({ id: res.id, model: "Ragatanga" });
        });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should delete a phone", () => {
    phone.remove(3).then((res) => {
      phone
        .findOne(3)
        .then((res2) => {
          expect(res2).toEqual([]);
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should update a phone", () => {
    phone.update(2, "New Model").then((res) => {
      phone
        .findOne(2)
        .then((res2) => {
          expect(res2[0]).toEqual({ id: 2, model: "New Model" });
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should not insert a duplicated model", async () => {
    let res = await phone
      .insert("Xiaomi")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert an empty model", async () => {
    let res = await phone
      .insert("")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });
});
