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
    let res = await serviceOrder
      .insert(3, 5, [1, 2], "2022-12-01")
      .then((res) => {
        return serviceOrder
          .findOne(res.id)
          .then((res2) => {
            res2[0].id = res.id;
            return res2[0];
          })
          .catch((err) => err);
      });
    expect(res).toEqual({
      endDate: null,
      beginDate: "2022-12-01",
      canceled: 0,
      cpf: "12345678912",
      email: "arcanjolevi@gmail.com",
      name: "Leví Cícero Arcanjo",
      id: res.id,
      idClient: 3,
      idPhone: 5,
      phoneModel: "Huawei",
      services: [
        {
          id: 1,
          price: 33.5,
          type: "Colocar Película",
        },
        {
          id: 2,
          price: 120.99,
          type: "Troca de Tela",
        },
      ],
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
          .then((res) => res[0])
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).not.toBe(undefined);
    expect(res.canceled).not.toBe(undefined);
    expect(res.canceled).toBe(1);
  });

  test("Should get a service order", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .findOne(2)
      .then((res) => res[0])
      .catch((err) => err);
    expect(res).toEqual({
      endDate: null,
      beginDate: "2022-06-15",
      canceled: 0,
      cpf: "12345678911",
      email: "lucasgrafimar@gmail.com",
      name: "Lucas Garavaglia",
      id: 2,
      idPhone: 2,
      idClient: 2,
      phoneModel: "Motorola",
      services: [{ id: 2, price: 120.99, type: "Troca de Tela" }],
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
      .update(2, 3, 4, "2022-12-01")
      .then(() => {
        return serviceOrder
          .findOne(2)
          .then((res) => res[0])
          .catch((err) => err);
      })
      .catch((err) => err);
    expect(res).toEqual({
      endDate: null,
      beginDate: "2022-12-01",
      canceled: 0,
      cpf: "12345678912",
      email: "arcanjolevi@gmail.com",
      name: "Leví Cícero Arcanjo",
      id: 2,
      idPhone: 4,
      idClient: 3,
      phoneModel: "Apple",
      services: [{ id: 2, type: "Troca de Tela", price: 120.99 }],
    });
  });

  test("Should not allow to insert a serviceOrder with a phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(1, 10, [1, 2], "2022-12-01")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("phone doesn't exist");
  });

  test("Should not allow to insert a serviceOrder with a client that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(10, 1, [1, 2], "2022-12-01")
      .then((res) => {})
      .catch((err) => err);
    expect(res).toBe("client doesn't exist");
  });

  test("Should not allow insert serviceOrder with client and phone that doesn't exist", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .insert(10, 10, [1, 2], "2022-12-01")
      .then((res) => {})
      .catch((err) => err);
    expect(res).toBe("phone doesn't exist");
  });

  test("Should return all Service Orders between date", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .getTotalServiceOrderByPeriod("2022-01-01", "2022-06-25")
      .then((res) => res)
      .catch((err) => err);
    expect(res).not.toBe(undefined);
    expect(res.length).not.toBe(undefined);
    expect(res.length).toBe(2);
    expect(res[0]).toEqual({
      id: 3,
      idClient: 3,
      idPhone: 4,
      canceled: 0,
      beginDate: "2022-05-18",
      endDate: "2022-06-25",
    });
    expect(res[1]).toEqual({
      id: 5,
      idClient: 1,
      idPhone: 5,
      canceled: 0,
      beginDate: "2022-02-01",
      endDate: "2022-04-15",
    });
  });

  test("Should return all Service Orders by client", async () => {
    await database("ServiceOrder").truncate();
    await database.seed.run();
    let res = await serviceOrder
      .getTotalServiceOrderByClient()
      .then((res) => res)
      .catch((err) => err);
    expect(res).toEqual([
      { Nome: "Caio Cezar das Neves Moreira", OS: 2 },
      { Nome: "Lucas Garavaglia", OS: 1 },
      { Nome: "Leví Cícero Arcanjo", OS: 1 },
      { Nome: "Guilherme Bachega Gomes", OS: 1 },
      { Nome: "Milena Santos", OS: 0 },
    ]);
  });
});
