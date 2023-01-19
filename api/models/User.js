const { Schema, model } = require('mongoose');

const User = new Schema(
  {
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = model('User', User);
