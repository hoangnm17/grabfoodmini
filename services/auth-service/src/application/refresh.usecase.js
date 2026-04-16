const jwt = require('jsonwebtoken');
const { hashToken } = require("../utils/hash");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");  

class Refresh {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    async execute(refreshToken) {
        const hashedToken = hashToken(refreshToken);
        
        const tokenDoc = await this.tokenRepository.findByToken(hashedToken);
        if (!tokenDoc || tokenDoc.isRevoked || tokenDoc.expiresAt < new Date()) {   
            throw new Error('Invalid refresh token');
        }

        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        await this.tokenRepository.revokeToken(hashedToken);
        const payload = { userId: decode.userId, role: decode.role };

        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        await this.tokenRepository.create({
            userId: decode.userId,
            token: hashToken(newRefreshToken),
            expiresAt: new Date(Date.now() + 7 * 86400000)
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

module.exports = Refresh;
