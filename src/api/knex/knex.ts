import { knex } from "knex";
const config = require("../../../knexfile");

export const database = knex(config.development);
export default database;
