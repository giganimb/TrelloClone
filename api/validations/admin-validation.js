const { checkSchema } = require('express-validator');

const deleteUserSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const getUserStatisticsSchema = checkSchema({
  userId: {
    in: 'query',
    exists: { errorMessage: 'User id is required' },
  },
});

module.exports = { deleteUserSchema, getUserStatisticsSchema };
