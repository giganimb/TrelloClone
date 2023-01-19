const userService = require('../services/user-service');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
