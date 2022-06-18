/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  //globalSetup: "./src/config/jestGlobalSetup.ts",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
