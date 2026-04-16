const path = require("path");
const fs = require("fs");

const copyTemplate = require("../utils/copy-template");
const replaceText = require("../utils/file-replace");

module.exports = (name) => {
  if (!name) {
    console.log("❌ Missing service name");
    return;
  }

  const templatePath = path.join(__dirname, "../../templates/base-service");
  const targetPath = path.join(__dirname, `../../services/${name}-service`);

  if (fs.existsSync(targetPath)) {
    console.log("❌ Service already exists");
    return;
  }

  // 1. copy template
  copyTemplate(templatePath, targetPath);

  // 2. replace placeholder
  replaceText(targetPath, "SERVICE_NAME", name);
  replaceText(targetPath, "DB_NAME", name);

  // 3. auto port
  const port = Math.floor(Math.random() * 1000) + 3000;
  replaceText(targetPath, "PORT=3000", `PORT=${port}`);

  console.log(`✅ Created ${name}-service`);
};