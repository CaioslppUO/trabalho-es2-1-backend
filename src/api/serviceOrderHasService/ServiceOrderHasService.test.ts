import { ServiceOrderHasService } from "./serviceOrderHasService";
import { database } from "../knex/knex";

describe("Test the service order has service database operations", () => {
  jest.setTimeout(100000);

  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let serviceOrderHasService = ServiceOrderHasService();

  test("Should insert a ServiceOrderHasService", async () => {
    await database("ServiceOrderHasService").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .insert(1, 2)
      .then((res) => {
        return serviceOrderHasService
          .findOne(1, 2)
          .then((res2) => res2[0])
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({ idService: 2, idServiceOrder: 1 });
  });

  test("Should consult a ServiceOrderHasService", async () => {
    await database("serviceOrderHasService").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .findOne(1, 1)
      .then((res) => res[0])
      .catch((err) => err);
    expect(res).toEqual({ idService: 1, idServiceOrder: 1 });
  });

  test("Should consult all ServiceOrderHasService", async () => {
    await database("serviceOrderHasService").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .find()
      .then((res) => {
        return res;
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(5);
  });

  test("Should delete a ServiceOrderHasService", async () => {
    await database("ServiceOrderHasService").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .remove(1, 1)
      .then((res) => res)
      .catch((err) => err);
    expect(res).toBe(true);
  });

  test("Should update a ServiceOrderHasService", async () => {
    await database("Client").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .update(1, 1, 3, 2)
      .then((res) => {
        return serviceOrderHasService.findOne(3, 2).then((res2) => res2[0]);
      })
      .catch((err) => err);
    expect(res).toEqual({ idService: 2, idServiceOrder: 3 });
  });

  test("Should not insert a service order has service with invalid service id", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .insert(5, 17)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid service id");
  });

  test("Should not insert a service order has service with invalid service order id", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrderHasService
      .insert(17, 5)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("invalid service order id");
  });
});
