import { Phone } from "./phone";

describe("Test the phone database operations", () => {
  test("Should select all phones", () => {
    let phone = Phone();
    phone.find().then((res) => {
      expect(res.length).toBeGreaterThanOrEqual(7);
      expect(Object.keys(res[0]).sort()).toEqual(["id", "model"].sort());
    });
  });

  test("Should select a phone", () => {
    let phone = Phone();
    phone.findOne(1).then((res) => {
      expect(res.length).toBe(1);
      expect(res[0]).toEqual({ id: 1, model: "Xiaomi" });
    });
  });

  test("Should insert a phone", () => {
    let phone = Phone();
    phone.insert("Ragatanga").then((res) => {
      phone.findOne(res.id).then((res2) => {
        expect(res2[0]).toEqual({ id: res.id, model: "Ragatanga" });
      });
    });
  });

  test("Should delete a phone", () => {
    let phone = Phone();
    phone.remove(3).then((res) => {
      phone.findOne(3).then((res2) => {
        expect(res2).toEqual([]);
      });
    });
  });

  test("Should update a phone", () => {
    let phone = Phone();
    phone.update(2, "New Model").then((res) => {
      phone.findOne(2).then((res2) => {
        expect(res2[0]).toEqual({ id: 2, model: "New Model" });
      });
    });
  });
});
