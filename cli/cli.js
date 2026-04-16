#!/usr/bin/env node

const createService = require("./generators/create-service");

const [,, command, name] = process.argv;

switch (command) {
  case "create":
    createService(name);
    break;
  default:
    console.log("Unknown command");
}