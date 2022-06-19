import { Service } from "./service";
import { database } from "../knex/knex";

describe("Test the service database operations", () => {
  let service = Service();

  test("Should not insert duplicated service type", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .insert("Troca de Tela", 13.55)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert empty service type", async () => {
    await database("Service").truncate();
    await database.seed.run();
    let res = await service
      .insert("", 10.55)
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("service type must not be empty");
  });
});
