const { checkSchema } = require('express-validator');

const getAllSchema = checkSchema({
  userId: {
    in: 'query',
    exists: { errorMessage: 'User id is required' },
  },
});

const getWorkspaceSchema = checkSchema({
  id: {
    in: 'params',
    exists: { errorMessage: 'Id is required' },
  },
});

const createWorkspaceSchema = checkSchema({
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
  userId: {
    in: 'body',
    exists: { errorMessage: 'User id is required' },
  },
});

const updateWorkspaceSchema = checkSchema({
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
});

const deleteWorkspaceSchema = checkSchema({
  id: {
    in: 'params',
  },
});

module.exports = {
  getAllSchema,
  getWorkspaceSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  deleteWorkspaceSchema,
};
