const { checkSchema } = require('express-validator');

const getAllSchema = checkSchema({
  boardId: {
    in: 'query',
    exists: { errorMessage: 'Board id is required' },
  },
});

const getListSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const createListSchema = checkSchema({
  name: {
    in: 'body',
    exists: { errorMessage: 'Name is required' },
    isString: { errorMessage: 'Name should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 30,
      },
      errorMessage: 'Name must be more than 2 and less than 30 characters',
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
  boardId: {
    in: 'body',
    exists: { errorMessage: 'Board id is required' },
  },
});

const updateListSchema = checkSchema({
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
        max: 30,
      },
      errorMessage: 'Name must be more than 2 and less than 30 characters',
    },
  },
  position: {
    in: 'body',
    optional: true,
    isInt: {
      options: {
        allow_leading_zeroes: false,
      },
      errorMessage: 'Position should be int',
    },
    toInt: true,
  },
});

const deleteListSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

module.exports = { getAllSchema, getListSchema, createListSchema, updateListSchema, deleteListSchema };
