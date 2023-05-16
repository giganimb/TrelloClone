const { Schema, model } = require('mongoose');

const Board = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#823DE1' },
    description: { type: String },
    workspaceId: {
      ref: 'Workspace',
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model('Board', Board);
