const fs = require("fs");
const path = require("path");

function replaceText(dir, from, to) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      replaceText(fullPath, from, to);
    } else {
      let content = fs.readFileSync(fullPath, "utf8");
      content = content.replaceAll(from, to);
      fs.writeFileSync(fullPath, content);
    }
  });
}

module.exports = replaceText;