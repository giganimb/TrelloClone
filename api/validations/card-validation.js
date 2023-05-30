const { checkSchema } = require('express-validator');

const getAllSchema = checkSchema({
  listId: {
    in: 'query',
    exists: { errorMessage: 'List id is required' },
  },
});

const getCardSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const createCardSchema = checkSchema({
  name: {
    in: 'body',
    exists: { errorMessage: 'Name is required' },
    isString: { errorMessage: 'Name should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: 'Name must be more than 2 and less than 100 characters',
    },
  },
  // position: {
  //   in: 'body',
  //   exists: { errorMessage: 'Position is required' },
  //   isInt: {
  //     options: {
  //       allow_leading_zeroes: false,
  //     },
  //     errorMessage: 'Position should be int',
  //   },
  //   toInt: true,
  // },
  description: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Description should be string' },
    trim: true,
    isLength: {
      options: {
        max: 1000,
      },
      errorMessage: 'Description must be less than 1000 characters',
    },
  },
  listId: {
    in: 'body',
    exists: { errorMessage: 'List id is required' },
  },
});

const updateCardSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
  name: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Name should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 100,
      },
      errorMessage: 'Name must be more than 2 and less than 100 characters',
    },
  },
  // position: {
  //   in: 'body',
  //   optional: true,
  //   isInt: {
  //     options: {
  //       allow_leading_zeroes: false,
  //     },
  //     errorMessage: 'Position should be int',
  //   },
  //   toInt: true,
  // },
  description: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Description should be string' },
    trim: true,
    isLength: {
      options: {
        max: 1000,
      },
      errorMessage: 'Description must be less than 1000 characters',
    },
  },
});

const deleteCardSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

module.exports = { getAllSchema, getCardSchema, createCardSchema, updateCardSchema, deleteCardSchema };
