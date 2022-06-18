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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
          console.log(err);
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
          console.log(err);
        });
    });
  });
});
