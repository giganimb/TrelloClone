const adminService = require('../services/admin-service');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await adminService.getAllUsers();
      res.status(200).json(users);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await adminService.deleteUser(req.params.id);
      res.status(200).json(user);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getUserStatistics(req, res) {
    try {
      const userStatistics = await adminService.getUserStatistics(req.query.userId);
      res.status(200).json(userStatistics);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
