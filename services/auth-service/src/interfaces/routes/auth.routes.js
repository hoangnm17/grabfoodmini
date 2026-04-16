const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");

module.exports = (controller) => {
  router.post("/register", registerValidator, validate, controller.register);
  router.post("/login", controller.login);
  router.post("/logout", controller.logout);
  router.post("/refresh", controller.refresh);

  return router;
}