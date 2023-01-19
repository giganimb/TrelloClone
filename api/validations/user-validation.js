const { checkSchema } = require('express-validator');

const getUserSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const updateUserSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
  userName: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Username should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: 'Username must be more than 2 and less than 20 characters',
    },
  },
  name: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Name should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: 'Name must be more than 2 and less than 20 characters',
    },
  },
  surname: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Surname should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: 'Surname must be more than 2 and less than 20 characters',
    },
  },
});

module.exports = { updateUserSchema, getUserSchema };
