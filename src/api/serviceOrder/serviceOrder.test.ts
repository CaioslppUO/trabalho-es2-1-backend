import { ServiceOrder } from "./serviceOrder";
import { database } from "../knex/knex";
describe("Test the service order database operations", () => {
  afterAll(async () => {
    await database("Client").truncate();
    await database.seed.run();
  });

  let serviceOrder = ServiceOrder();

  test("Should insert a service order", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder.insert(3, 5).then((res) => {
      return serviceOrder
        .findOne(res.id)
        .then((res2) => {
          res2[0].id = res.id;
          return res2[0];
        })
        .catch((err) => err);
    });
    expect(res).toEqual({
      cpf: "12345678912",
      email: "arcanjolevi@gmail.com",
      name: "Leví Cícero Arcanjo",
      id: res.id,
      idPhone: 5,
      phoneModel: "Huawei",
      services: [],
    });
  });

  test("Should not allow to insert a serviceOrder with a phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(1, 10)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("phone doesn't exist");
  });

  test("Should not allow to insert a serviceOrder with a client that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(10, 1)
      .then((res) => {})
      .catch((err) => err);
    expect(res).toBe("client doesn't exist");
  });

  test("Should not allow insert serviceOrder with client and phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(10, 10)
      .then((res) => {})
      .catch((err) => err);
    expect(res).toBe("phone doesn't exist");
  });
});
