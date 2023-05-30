const { Schema, model } = require('mongoose');

const Card = new Schema(
  {
    name: { type: String, required: true },
    position: { type: Number },
    description: { type: String },
    expiryDate: { type: String },
    priority: { type: Number },
    listId: {
      ref: 'List',
      type: Schema.Types.ObjectId,
      index: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model('Card', Card);
