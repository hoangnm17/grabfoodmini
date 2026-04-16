const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { hashToken } = require("../utils/hash");
const UserEntity = require('../domain/entities/User');

class Login {
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    async execute(data) {
        const loginAttempt = new UserEntity(data);
        if (!loginAttempt.phone || !loginAttempt.password) {
            throw new Error('Phone and password are required');
        }

        const userData = await this.userRepository.findByPhone(loginAttempt.phone);
        if (!userData) {
            throw new Error('User not found');
        }

        // Khởi tạo Entity từ query Database
        const user = new UserEntity({
            id: userData._id,
            phone: userData.phone,
            password: userData.password,
            email: userData.email,
            role: userData.role,
            username: userData.username
        });

        const isMatch = await bcrypt.compare(loginAttempt.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        
        const payload = { userId: user.id, role: user.role };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        await this.tokenRepository.create({
            userId: user.id,
            token: hashToken(refreshToken),
            expiresAt: new Date(Date.now() + 7 * 86400000)
        });

        return { accessToken, refreshToken };
    }
}

module.exports = Login;