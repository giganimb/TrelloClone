const boardService = require('../services/board-service');

module.exports = {
  async getAll(req, res) {
    try {
      const boards = await boardService.getAll(req.query);
      res.status(200).json(boards);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getBoard(req, res) {
    try {
      const board = await boardService.getBoard(req.params.id);
      res.status(200).json(board);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async createBoard(req, res) {
    try {
      const board = await boardService.createBoard(req.body);
      res.status(200).json(board);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateBoard(req, res) {
    try {
      const board = await boardService.updateBoard(req.params.id, req.body);
      res.status(200).json(board);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteBoard(req, res) {
    try {
      const board = await boardService.deleteBoard(req.params.id);
      res.status(200).json(board);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
