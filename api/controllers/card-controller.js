const cardService = require('../services/card-service');
const socketServer = require('../socket-connection');

module.exports = {
  async getAll(req, res) {
    try {
      const cards = await cardService.getAll(req.query);
      res.status(200).json(cards);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async getCard(req, res) {
    try {
      const card = await cardService.getCard(req.params.id);
      res.status(200).json(card);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async createCard(req, res) {
    try {
      const card = await cardService.createCard(req.body);

      socketServer().to(req.body.boardId).emit('panel updated');

      res.status(200).json(card);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateCard(req, res) {
    try {
      const card = await cardService.updateCard(req.params.id, req.body);

      socketServer().to(req.body.boardId).emit('panel updated');

      res.status(200).json(card);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async deleteCard(req, res) {
    try {
      const card = await cardService.deleteCard(req.params.id);

      socketServer().to(req.query.boardId).emit('panel updated');

      res.status(200).json(card);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateCardsBetweenLists(req, res) {
    try {
      const card = await cardService.updateCardsBetweenLists(req.body);

      socketServer().to(req.body.boardId).emit('panel updated');

      res.status(200).json(card);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
