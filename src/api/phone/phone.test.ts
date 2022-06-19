import { Phone } from "./phone";
import { database } from "../knex/knex";

describe("Test the phone database operations", () => {
  let phone = Phone();

  test("Should not insert a duplicated model", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .insert("Xiaomi")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });

  test("Should not insert an empty model", async () => {
    await database("Phone").truncate();
    await database.seed.run();
    let res = await phone
      .insert("")
      .then(() => {})
      .catch((err) => err);
    expect(res).toBe("could not insert");
  });
});
