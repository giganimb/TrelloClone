const { Schema, model } = require('mongoose');

const Token = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Token', Token);
