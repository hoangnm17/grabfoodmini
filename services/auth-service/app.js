require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// repo
const UserRepo = new (require("./src/infrastructure/repositories/user.repository"))();
const TokenRepo = new (require("./src/infrastructure/repositories/token.repository"))();

// usecase
const Register = new (require("./src/application/register.usecase"))(UserRepo);
const Login = new (require("./src/application/login.usecase"))(UserRepo, TokenRepo);
const Refresh = new (require("./src/application/refresh.usecase"))(TokenRepo);
const Logout = new (require("./src/application/logout.usecase"))(TokenRepo);

// controller
const Controller = new (require("./src/interfaces/controllers/auth.controllers"))(
  Register,
  Login,
  Refresh,
  Logout
);

// route
app.use("/auth", require("./src/interfaces/routes/auth.routes")(Controller));

app.use(require("./src/interfaces/middlewares/errorHandler,middleware"));

app.listen(process.env.PORT, () =>
  console.log("Auth running at", process.env.PORT)
);