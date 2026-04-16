const Token = require('../db/mongoose/refreshToken.model');

class TokenRepository {
    create(data) {
        const token = new Token(data);
        return Token.create(token);
    }

    findByToken(token) {
        return Token.findOne({ token });
    }

    revokeToken(token) {
        return Token.findOneAndUpdate({ token }, { isRevoked: true }, { new: true });
    }
}

module.exports = TokenRepository;