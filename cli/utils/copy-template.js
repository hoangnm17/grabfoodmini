const fs = require("fs");

module.exports = (src, dest) => {
  fs.cpSync(src, dest, { recursive: true });
};