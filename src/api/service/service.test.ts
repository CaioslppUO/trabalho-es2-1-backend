import { Service } from "./service";
import { database } from "../knex/knex";

describe("Test the service database operations", () => {
  let service = Service();

  test("Should select all services", () => {
    service
      .find()
      .then((res) => {
        expect(res.length).toBeGreaterThanOrEqual(5);
        expect(Object.keys(res[0]).sort()).toEqual(
          ["id", "type", "price"].sort()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should select a service", () => {
    service
      .findOne(2)
      .then((res) => {
        expect(res[0]).toEqual({ id: 2, type: "Troca de Tela", price: 120.99 });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should insert a service", () => {
    service
      .insert("Troca de óleo(?)", 1500.05)
      .then((res) => {
        service.findOne(res.id).then((res2) => {
          expect(res2[0]).toEqual({
            id: res.id,
            type: "Troca de óleo(?)",
            price: 1500.05,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should remove a service", () => {
    service
      .remove(4)
      .then((res) => {
        service.findOne(4).then((res2) => {
          expect(res2).toEqual([]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should update a service", () => {
    service
      .update(5, "Mudança de casa", 499.12)
      .then((res) => {
        service.findOne(5).then((res2) => {
          expect(res2[0]).toEqual({
            id: 5,
            type: "Mudança de casa",
            price: 499.12,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
