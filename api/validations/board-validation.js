const { checkSchema } = require('express-validator');

const getAllSchema = checkSchema({
  workspaceId: {
    in: 'query',
    exists: { errorMessage: 'Workspace id is required' },
  },
  sort_type: {
    in: 'query',
    optional: true,
    isString: { errorMessage: 'Sort type should be string' },
    trim: true,
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: 'Sort type is invalid',
    },
  },
  sort_field: {
    in: 'query',
    optional: true,
    isString: { errorMessage: 'Sort field should be string' },
    trim: true,
    isIn: {
      options: [['name']],
      errorMessage: 'Sort field is invalid',
    },
  },
});

const getBoardSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const createBoardSchema = checkSchema({
  name: {
    in: 'body',
    exists: { errorMessage: 'Name is required' },
    isString: { errorMessage: 'Name should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 14,
      },
      errorMessage: 'Name must be more than 2 and less than 14 characters',
    },
  },
  color: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Color should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 14,
      },
      errorMessage: 'Color must be more than 2 and less than 14 characters',
    },
  },
  workspaceId: {
    in: 'body',
    exists: { errorMessage: 'Workspace id is required' },
  },
});

const updateBoardSchema = checkSchema({
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
        max: 14,
      },
      errorMessage: 'Name must be more than 2 and less than 14 characters',
    },
  },
  color: {
    in: 'body',
    optional: true,
    isString: { errorMessage: 'Color should be string' },
    trim: true,
    isLength: {
      options: {
        min: 2,
        max: 14,
      },
      errorMessage: 'Color must be more than 2 and less than 14 characters',
    },
  },
});

const deleteBoardSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

module.exports = { getAllSchema, getBoardSchema, createBoardSchema, updateBoardSchema, deleteBoardSchema };
