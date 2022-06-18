import { ServiceOrder } from "./serviceOrder";

describe("Test the service order database operations", () => {
  let serviceOrder = ServiceOrder();

  test("Should select all services orders", () => {
    serviceOrder
      .find()
      .then((res) => {
        expect(res.length).toBeGreaterThanOrEqual(5);
        expect(Object.keys(res[0]).sort()).toEqual(
          ["id", "idClient", "idPhone"].sort()
        );
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should select a service ordem", () => {
    serviceOrder
      .findOne(2)
      .then((res) => {
        expect(res[0]).toEqual({ id: 2, idClient: 2, idPhone: 2 });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should insert a service order", () => {
    serviceOrder
      .insert(3, 5)
      .then((res) => {
        serviceOrder.findOne(res.id).then((res2) => {
          expect(res2[0]).toEqual({
            id: res.id,
            idClient: 3,
            idPhone: 5,
          });
        });
      })
      .catch((err) => {
        expect(err).toEqual("Error");
      });
  });

  test("Should remove a service order", () => {
    serviceOrder
      .remove(4)
      .then((res) => {
        serviceOrder.findOne(4).then((res2) => {
          expect(res2).toEqual([]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should update a service order", () => {
    serviceOrder
      .update(5, 2, 1)
      .then((res) => {
        serviceOrder.findOne(5).then((res2) => {
          expect(res2[0]).toEqual({
            id: 5,
            idClient: 2,
            idPhone: 1,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  test("Should not allow to insert a serviceOrder with a phone that doesn't exist", () => {
    serviceOrder
      .insert(1, 10)
      .then((res) => {
        expect(res.id).toBe(-1);
      })
      .catch((err) => {
        expect(err.id).toBe(-1);
      });
  });

  test("Should not allow to insert a serviceOrder with a client that doesn't exist", () => {
    serviceOrder
      .insert(10, 1)
      .then((res) => {
        expect(res.id).toBe(-1);
      })
      .catch((err) => {
        expect(err.id).toBe(-1);
      });
  });
});
