const listService = require('../services/list-service');
const socketServer = require('../socket-connection');

module.exports = {
  async getAll(req, res) {
    try {
      const lists = await listService.getAll(req.query);
      res.status(200).json(lists);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getList(req, res) {
    try {
      const list = await listService.getList(req.params.id);
      res.status(200).json(list);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async createList(req, res) {
    try {
      const list = await listService.createList(req.body);

      socketServer().to(req.body.boardId).emit('panel updated');

      res.status(200).json(list);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateList(req, res) {
    try {
      const list = await listService.updateList(req.params.id, req.body);

      socketServer().to(req.body.boardId).emit('panel updated');

      res.status(200).json(list);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteList(req, res) {
    try {
      const list = await listService.deleteList(req.params.id);

      socketServer().to(req.query.boardId).emit('panel updated');

      res.status(200).json(list);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
