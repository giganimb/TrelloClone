const { Schema, model } = require('mongoose');

const List = new Schema(
  {
    name: { type: String, required: true },
    boardId: {
      ref: 'Board',
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },
    workspaceId: {
      ref: 'Workspace',
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model('List', List);
