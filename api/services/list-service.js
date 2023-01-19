const List = require('../models/List');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAll(query) {
    const { boardId } = query;
    const lists = await List.find({ boardId });

    if (!lists) throw ApiError.NotFound();

    return lists;
  },

  async getList(id) {
    const list = await List.findById(id);

    if (!list) throw ApiError.NotFound();

    return list;
  },

  async createList(body) {
    const { name, position, boardId } = body;

    const nameConflict = await List.findOne({ boardId: boardId, name: name });

    if (nameConflict) throw ApiError.UnprocessableEntity('List already exists');

    const list = await List.create({ name: name, position: position, boardId: boardId });

    return list;
  },

  async updateList(id, body) {
    const conflict = await List.findOne({ boardId: body.boardId, name: body.name });

    if (conflict) throw ApiError.UnprocessableEntity('List name already in use');

    const updatedList = await List.findByIdAndUpdate(id, body, { new: true });

    if (!updatedList) throw ApiError.NotFound();

    return updatedList;
  },

  async deleteList(id) {
    const deletedList = await List.findByIdAndDelete(id);

    if (!deletedList) throw ApiError.NotFound();

    return deletedList;
  },
};
