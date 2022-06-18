// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/src/database/data.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/src/database//migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },

  staging: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/src/database/data.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/src/database//migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/src/database/data.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/src/database//migrations",
    },
    seeds: {
      directory: __dirname + "/src/database/seeds",
    },
  },
};
