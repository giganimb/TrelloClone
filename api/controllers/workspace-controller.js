const workspaceService = require('../services/workspace-service');

module.exports = {
  async getAll(req, res) {
    try {
      const workspaces = await workspaceService.getAll(req.query);
      res.status(200).json(workspaces);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getWorkspace(req, res) {
    try {
      const workspace = await workspaceService.getWorkspace(req.params.id);
      res.status(200).json(workspace);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async createWorkspace(req, res) {
    try {
      const workspace = await workspaceService.createWorkspace(req.body);
      res.status(200).json(workspace);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateWorkspace(req, res) {
    try {
      const workspace = await workspaceService.updateWorkspace(req.params.id, req.body);
      res.status(200).json(workspace);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteWorkspace(req, res) {
    try {
      const workspace = await workspaceService.deleteWorkspace(req.params.id);
      res.status(200).json(workspace);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async addUserToWorkspace(req, res) {
    try {
      const workspaceMember = await workspaceService.addUserToWorkspace(req.body);
      res.status(200).json(workspaceMember);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteUserFromWorkspace(req, res) {
    try {
      const workspaceMember = await workspaceService.deleteUserFromWorkspace(req.body);
      res.status(200).json(workspaceMember);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getWorkspaceMembers(req, res) {
    try {
      const workspaceMembers = await workspaceService.getWorkspaceMembers(req.params.id);
      res.status(200).json(workspaceMembers);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
