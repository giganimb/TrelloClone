const { Schema, model } = require('mongoose');

const Board = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: '#6200EA' },
    position: { type: Number },
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
