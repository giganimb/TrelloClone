const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

require('dotenv').config();

module.exports = {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  },

  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY);
      return userData;
    } catch (er) {
      return null;
    }
  },

  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY);
      return userData;
    } catch (er) {
      return null;
    }
  },

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const newToken = await Token.create({ user: userId, refreshToken: refreshToken });
    return newToken;
  },

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  },

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken });
  },
};
