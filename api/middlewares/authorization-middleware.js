const tokenService = require('../services/token-service');
const ApiError = require('../errors/api-error');

module.exports = function (req, res, next) {
  try {
    if (req.method === 'OPTIONS') {
      next();
    }

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw ApiError.Unauthorized();
    }

    const accesToken = authorizationHeader.split(' ')[1];
    if (!accesToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateAccessToken(accesToken);
    if (!userData) {
      throw ApiError.Unauthorized();
    }

    req.user = userData;
    next();
  } catch (er) {
    console.log(er);
    return res.status(er.status || 500).json({ message: er.message });
  }
};
