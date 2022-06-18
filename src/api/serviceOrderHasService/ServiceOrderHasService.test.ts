import { ServiceOrderHasService } from "./serviceOrderHasService";
import { database } from "../knex/knex";

describe("Test the service order has service database operations", () => {
  let serviceOrderHasService = ServiceOrderHasService();

  test("Should select all services orders have services", () => {
    serviceOrderHasService
      .find()
      .then((res) => {
        expect(res.length).toBeGreaterThanOrEqual(5);
        expect(Object.keys(res[0]).sort()).toEqual(
          ["idServiceOrder", "idService"].sort()
        );
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should select a service ordem has service", () => {
    serviceOrderHasService
      .findOne(2, 2)
      .then((res) => {
        expect(res[0]).toEqual({ idServiceOrder: 2, idService: 2 });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });

  test("Should insert a service order has service", () => {
    serviceOrderHasService.insert(3, 5).then((res) => {
      serviceOrderHasService
        .findOne(3, 5)
        .then((res2) => {
          expect(res2[0]).toEqual({
            idServiceOrder: 3,
            idService: 5,
          });
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should remove a service order has service", () => {
    serviceOrderHasService.remove(4, 4).then((res) => {
      serviceOrderHasService
        .findOne(4, 4)
        .then((res2) => {
          expect(res2).toEqual([]);
        })
        .catch((err) => {
          expect(err).toMatch("error");
        });
    });
  });

  test("Should update a service order has service", () => {
    serviceOrderHasService
      .update(1, 1, 1, 2)
      .then((res) => {
        serviceOrderHasService.findOne(1, 2).then((res2) => {
          expect(res2[0]).toEqual({
            idServiceOrder: 1,
            idService: 2,
          });
        });
      })
      .catch((err) => {
        expect(err).toMatch("error");
      });
  });
});
