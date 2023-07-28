const { Schema, model } = require('mongoose');

const WorkspaceMember = new Schema(
  {
    userId: {
      ref: 'User',
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

module.exports = model('WorkspaceMember', WorkspaceMember);
