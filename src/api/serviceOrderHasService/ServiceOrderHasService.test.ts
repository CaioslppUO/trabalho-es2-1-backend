import { ServiceOrderHasService } from "./serviceOrderHasService";
import { database } from "../knex/knex";

describe("Test the service order has service database operations", () => {
  let serviceOrderHasService = ServiceOrderHasService();

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
