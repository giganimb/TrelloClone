const Workspace = require('../models/Workspace');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAll(query) {
    const { userId } = query;

    const workspaces = await Workspace.find({ userId });

    if (!workspaces) throw ApiError.NotFound();

    return workspaces;
  },

  async getWorkspace(id) {
    const workspace = await Workspace.findById(id);

    if (!workspace) throw ApiError.NotFound();

    return workspace;
  },

  async createWorkspace(body) {
    const { name, userId } = body;

    const conflict = await Workspace.findOne({ userId: userId, name: name });

    if (conflict) throw ApiError.UnprocessableEntity('Workspace already exists');

    const workspace = await Workspace.create({ name: name, userId: userId });

    return workspace;
  },

  async updateWorkspace(id, body) {
    const conflict = await Workspace.findOne({ userId: body.userId, name: body.name });

    if (conflict) throw ApiError.UnprocessableEntity('Workspace name already in use');

    const updatedWorkspace = await Workspace.findByIdAndUpdate(id, body, { new: true });

    if (!updatedWorkspace) throw ApiError.NotFound();

    return updatedWorkspace;
  },

  async deleteWorkspace(id) {
    const deletedWorkspace = await Workspace.findByIdAndDelete(id);

    if (!deletedWorkspace) throw ApiError.NotFound();

    return deletedWorkspace;
  },
};
