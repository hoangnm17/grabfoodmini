const { hashToken } = require("../utils/hash");

class Logout {
  constructor(tokenRepo) {
    this.tokenRepo = tokenRepo;
  }

  async execute(refreshToken) {
    return this.tokenRepo.revoke(hashToken(refreshToken));
  }
}

module.exports = Logout;