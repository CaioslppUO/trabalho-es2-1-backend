import * as fs from "fs";
import { database } from "./src/api/knex/knex";
import { exit } from "process";
import { Phone } from "./src/api/phone/phone";

// Initialize the database and populate it.
const initialize_db = (): Promise<void> => {
  return new Promise(async (resolve, rejects) => {
    if (!fs.existsSync(__dirname + "/src/database/data.sqlite3")) {
      await database.migrate.latest();
      await database.seed.run();
    }
    resolve();
  });
};

initialize_db().then(() => {
  let p = Phone();
  p.find().then((res) => {
    console.log(res);
    exit();
  });
});
