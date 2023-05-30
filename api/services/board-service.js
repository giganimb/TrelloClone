const Board = require('../models/Board');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAll(query) {
    const { workspaceId } = query;

    const sort_type = query.sort_type || 'asc';
    const sort_field = query.sort_field || 'name';

    const boards = await Board.find({ workspaceId }).sort([[`${sort_field}`, `${sort_type}`]]);

    if (!boards) throw ApiError.NotFound();

    return boards;
  },

  async getBoard(id) {
    const board = await Board.findById(id);

    if (!board) throw ApiError.NotFound();

    return board;
  },

  async createBoard(body) {
    const { name, color, workspaceId } = body;

    const conflict = await Board.findOne({ workspaceId: workspaceId, name: name });

    if (conflict) throw ApiError.UnprocessableEntity('Board already exists');

    const board = await Board.create({
      name: name,
      color: color,
      workspaceId: workspaceId,
    });

    return board;
  },

  async updateBoard(id, body) {
    const conflict = await Board.findOne({ workspaceId: body.workspaceId, name: body.name });

    if (conflict && conflict._id != id) throw ApiError.UnprocessableEntity('Board name already in use');

    const updatedBoard = await Board.findByIdAndUpdate(id, body, { new: true });

    if (!updatedBoard) throw ApiError.NotFound();

    return updatedBoard;
  },

  async deleteBoard(id) {
    const deletedBoard = await Board.findByIdAndDelete(id);

    if (!deletedBoard) throw ApiError.NotFound();

    return deletedBoard;
  },
};
