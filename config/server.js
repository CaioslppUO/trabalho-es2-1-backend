module.exports = ({ env }) => ({
  url: env("https://sistema-nota-fiscal-test.herokuapp.com/"),
  proxy: true,
  app: {
      keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  },
});