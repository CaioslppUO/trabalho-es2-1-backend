import { ServiceOrder } from "./serviceOrder";
import { database } from "../knex/knex";
describe("Test the service order database operations", () => {
  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let serviceOrder = ServiceOrder();

  test("Should not allow to insert a serviceOrder with a phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    serviceOrder
      .insert(1, 10)
      .then((res) => {
        expect(res.id).toBe(-1);
      })
      .catch((err) => {
        expect(err).toBe("phone doesn't exist");
      });
  });

  test("Should not allow to insert a serviceOrder with a client that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    serviceOrder
      .insert(10, 1)
      .then((res) => {
        expect(res.id).toBe(-1);
      })
      .catch((err) => {
        expect(err).toBe("client doesn't exist");
      });
  });

  test("Should not allow insert serviceOrder with client and phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    serviceOrder
      .insert(10, 10)
      .then((res) => {
        expect(res.id).toBe(-1);
      })
      .catch((err) => {
        expect(err).toBe("phone doesn't exist");
      });
  });
});
