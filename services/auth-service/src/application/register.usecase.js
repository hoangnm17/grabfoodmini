const bcrypt = require('bcrypt');
const UserEntity = require('../domain/entities/User');

class Register {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    // 1. Tạo Domain Entity và kiểm tra tính hợp lệ
    const user = new UserEntity(data);
    user.validate();

    // 2. Kiểm tra tài khoản tồn tại
    const existed = await this.userRepository.findByPhone(user.phone);
    if (existed) {
      throw new Error('User already exists');
    }
    
    // 3. Mã hóa mật khẩu
    user.password = await bcrypt.hash(user.password, 10);

    // 4. Lưu xuống DB
    return await this.userRepository.create({
      phone: user.phone,
      password: user.password,
      email: user.email,
      role: user.role,
      username: user.username
    });
  }
}

module.exports = Register;