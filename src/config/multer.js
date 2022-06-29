const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = multer({
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});
