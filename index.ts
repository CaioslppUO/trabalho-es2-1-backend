import * as fs from "fs";
import { database } from "./src/api/knex/knex";
require("dotenv").config();

var app = require("express")();
var bodyParser = require("body-parser");
var server = require("http").Server(app);
var jsonParser = bodyParser.json();
const cors = require("cors");

const port = process.env.PORT || 3333;

// Importing routes
import * as clientRouter from "./src/routes/client";
import * as serviceRouter from "./src/routes/service";
import * as phoneRouter from "./src/routes/phone";
import * as serviceOrderRouter from "./src/routes/serviceOrder";
import * as serviceOrderHasServiceRouter from "./src/routes/serviceOrderHasService";

// Initialize the database and populate it.
const initialize_db = (wipe_db: boolean): Promise<void> => {
  return new Promise(async (resolve, rejects) => {
    if (!fs.existsSync(__dirname + "/src/database/data.sqlite3")) {
      await database.migrate.latest();
    }
    if (wipe_db) {
      await database.seed.run();
    }
    resolve();
  });
};

// Setup Routes
initialize_db(false).then(() => {
  app.use(cors());

  app.get("/", jsonParser, (req: any, res: any) => {
    res.sendFile(__dirname + "/index.html");
  });

  // Client routes
  app.use("/api", clientRouter.router);

  // Service routes
  app.use("/api", serviceRouter.router);

  // Phone routes
  app.use("/api", phoneRouter.router);

  // ServiceOrder routes
  app.use("/api", serviceOrderRouter.router);

  // ServiceOrderHasService routes
  app.use("/api", serviceOrderHasServiceRouter.router);

  server.listen(port, () => {
    console.log(`Listening on :${port}`);
  });
});
