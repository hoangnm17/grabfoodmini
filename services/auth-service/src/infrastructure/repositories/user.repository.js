const User = require('../db/mongoose/user.model');

class UserRepository {
  async findByPhone(phone) {
    return await User.findOne({ phone });
  }

  async create(data) {
    return await User.create(data);
  }
}

module.exports = UserRepository;