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
  },
  { timestamps: true }
);

module.exports = model('List', List);
