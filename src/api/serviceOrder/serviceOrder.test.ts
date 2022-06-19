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

  test("Should remove a service order", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .remove(3)
      .then(() => {
        return serviceOrder
          .findOne(3)
          .then((res) => res)
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(0);
  });

  test("Should get a service order", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .findOne(2)
      .then((res) => res[0])
      .catch((err) => err);
    expect(res).toEqual({
      cpf: "12345678911",
      email: "lucasgrafimar@gmail.com",
      name: "Lucas Garavaglia",
      id: 2,
      idPhone: 2,
      phoneModel: "Motorola",
      services: [{ price: 120.99, type: "Troca de Tela" }],
    });
  });

  test("Should get all service orders", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .find()
      .then((res) => res)
      .catch((err) => err);
    expect(res).not.toBe("undefined");
    expect(res.length).not.toBe("undefined");
    expect(res.length).toBe(5);
  });

  test("Should update a service order", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .update(2, 3, 4)
      .then(() => {
        return serviceOrder
          .findOne(2)
          .then((res) => {
            return res[0];
          })
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({
      cpf: "12345678912",
      email: "arcanjolevi@gmail.com",
      name: "Leví Cícero Arcanjo",
      id: 2,
      idPhone: 4,
      phoneModel: "Apple",
      services: [{ type: "Troca de Tela", price: 120.99 }],
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
