const { validationResult } = require('express-validator');

module.exports = {
  validatePayload(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Bad request', statusCode: 400, errors: errors.array() });
      return;
    }
    next();
  },
};
