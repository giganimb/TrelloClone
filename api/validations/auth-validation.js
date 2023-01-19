const { checkSchema } = require('express-validator');

const signupSchema = checkSchema({
  email: {
    in: 'body',
    exists: { errorMessage: 'E-mail is required' },
    isString: { errorMessage: 'E-mail should be string' },
    trim: true,
    isEmail: { errorMessage: 'Please provide valid email' },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: 'E-mail must be less than 50 characters',
    },
  },
  userName: {
    in: 'body',
    exists: { errorMessage: 'Username is required' },
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
    exists: { errorMessage: 'Name is required' },
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
    exists: { errorMessage: 'Surname is required' },
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
  password: {
    in: 'body',
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be string' },
    trim: true,
    isLength: {
      options: {
        min: 8,
        max: 15,
      },
      errorMessage: 'Password must be more than 8 and less than 15 characters',
    },
  },
});

const loginSchema = checkSchema({
  email: {
    in: 'body',
    exists: { errorMessage: 'E-mail is required' },
    isString: { errorMessage: 'E-mail should be string' },
    trim: true,
    isEmail: { errorMessage: 'Please provide valid email' },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: 'E-mail must be less than 50 characters',
    },
  },
  password: {
    in: 'body',
    exists: { errorMessage: 'Password is required' },
    isString: { errorMessage: 'Password should be string' },
    trim: true,
    isLength: {
      options: {
        min: 8,
        max: 15,
      },
      errorMessage: 'Password must be more than 8 and less than 15 characters',
    },
  },
});

module.exports = { signupSchema, loginSchema };
