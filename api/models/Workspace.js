const { Schema, model } = require('mongoose');

const Workspace = new Schema(
  {
    name: { type: String, required: true },
    userId: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model('Workspace', Workspace);
