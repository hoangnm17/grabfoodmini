require("dotenv").config();
const express = require("express");

const connectDB = require("./infrastructure/db/mongo");

// layers
const repository = require("./infrastructure/repositories/sample.repository");
const SampleUseCase = require("./application/sample.usecase");
const SampleController = require("./interfaces/controllers/sample.controller");
const sampleRoutes = require("./interfaces/routes/sample.routes");

const app = express();
app.use(express.json());

// init
connectDB();

const useCase = new SampleUseCase(repository);
const controller = new SampleController(useCase);

// routes
app.use("/samples", sampleRoutes(controller));

app.listen(3000, () => {
  console.log("Service running on port 3000");
});