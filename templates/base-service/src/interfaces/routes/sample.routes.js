const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.post("/", controller.create);
  router.get("/", controller.getAll);

  return router;
};