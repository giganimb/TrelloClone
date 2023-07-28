const Workspace = require('../models/Workspace');
const WorkspaceMember = require('../models/WorkspaceMember');
const User = require('../models/User');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAll(query) {
    const { userId } = query;

    const workspacesIds = (await WorkspaceMember.find({ userId })).map(
      (workspaceMember) => workspaceMember.workspaceId
    );

    if (!workspacesIds) throw ApiError.NotFound(`Workspaces' ids not found`);

    const workspaces = await Workspace.find({ _id: { $in: workspacesIds } });

    if (!workspaces) throw ApiError.NotFound('Workspaces not found');

    return workspaces;
  },

  async getWorkspace(id) {
    const workspace = await Workspace.findById(id);

    if (!workspace) throw ApiError.NotFound();

    return workspace;
  },

  async createWorkspace(body) {
    const { name, userId } = body;

    const conflict = await Workspace.findOne({ ownerId: userId, name: name });

    if (conflict) throw ApiError.UnprocessableEntity('Workspace already exists');

    const workspace = await Workspace.create({ name: name, ownerId: userId });

    await WorkspaceMember.create({ userId: userId, workspaceId: workspace._id });

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

    if (!deletedWorkspace) throw ApiError.NotFound('Workspace not found');

    const deletedWorkspaceMembers = await WorkspaceMember.deleteMany({ workspaceId: id });

    if (!deletedWorkspaceMembers) throw ApiError.NotFound('Workspace members not found');

    return deletedWorkspace;
  },

  async addUserToWorkspace(body) {
    const { workspaceId, userName } = body;

    const user = await User.findOne({ userName: userName });

    if (!user) throw ApiError.NotFound('User not found');

    const conflict = await WorkspaceMember.findOne({ workspaceId: workspaceId, userId: user._id });

    if (conflict) throw ApiError.UnprocessableEntity('Workspace member already exists');

    const addedWorkspaceMember = WorkspaceMember.create({ workspaceId: workspaceId, userId: user._id });

    return addedWorkspaceMember;
  },

  async deleteUserFromWorkspace(body) {
    const { workspaceId, userId } = body;

    const deletedWorkspaceMember = await WorkspaceMember.deleteOne({ workspaceId: workspaceId, userId: userId });

    if (!deletedWorkspaceMember) throw ApiError.NotFound('Workspace member not found');

    return deletedWorkspaceMember;
  },

  async getWorkspaceMembers(id) {
    const usersIds = (await WorkspaceMember.find({ workspaceId: id })).map((workspaceMember) => workspaceMember.userId);

    if (!usersIds) throw ApiError.NotFound(`Users' ids not found`);

    const users = await User.find({ _id: { $in: usersIds } });

    if (!users) throw ApiError.NotFound('Users not found');

    return users;
  },
};
