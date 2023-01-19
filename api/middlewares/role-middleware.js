const tokenService = require('../services/token-service');
const ApiError = require('../errors/api-error');

module.exports = function (roles) {
  return function (req, res, next) {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }

      const accesToken = req.headers.authorization.split(' ')[1];

      const { roles: userRoles } = tokenService.validateAccessToken(accesToken);

      let userHasRole = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          userHasRole = true;
        }
      });

      if (!userHasRole) {
        throw ApiError.Forbidden();
      }

      next();
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  };
};
