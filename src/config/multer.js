const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  Storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
  }),
};
