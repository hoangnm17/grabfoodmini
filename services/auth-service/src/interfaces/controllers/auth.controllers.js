const asyncHandleError = require('../../utils/asyncHandleError')

class AuthController {
  constructor(register, login, logout, refresh) {
    this.registerUC = register;
    this.loginUC = login;
    this.logoutUC = logout;
    this.refreshUC = refresh;
  }

  register = asyncHandleError(async (req, res) => {
    const user = await this.registerUC.execute(req.body);

    const { password, ...userData } = user.toObject();

    res.status(201).json(userData);
  });

  login = asyncHandleError(async (req, res) => {
    const tokens = await this.loginUC.execute(req.body);

    res.json(tokens);
  });

  logout = asyncHandleError(async (req, res) => {
    await this.logoutUC.execute(req.body.refreshToken);

    res.json({ message: "Logged out successfully" });
  });

  refresh = asyncHandleError(async (req, res) => {
    const tokens = await this.refreshUC.execute(req.body.refreshToken);

    res.json(tokens);
  });
}

module.exports = AuthController;