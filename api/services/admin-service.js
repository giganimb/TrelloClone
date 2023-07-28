const User = require('../models/User');
const Workspace = require('../models/Workspace');
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');
const UserStatsDto = require('../dtos/user-stats-dto');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAllUsers() {
    const users = await User.find().sort('userName');

    if (!users) throw ApiError.NotFound();

    return users;
  },

  async deleteUser(id) {
    const deletedUser = await User.findById(id);

    if (deletedUser.roles.includes('admin')) throw ApiError.Forbidden('Admin cannot be removed');

    await User.deleteOne({ _id: id });

    if (!deletedUser) throw ApiError.NotFound();

    return deletedUser;
  },

  async getUserStatistics(userId) {
    const workspaces = await Workspace.find({ ownerId: userId });
    const workspacesIds = getEntityIds(workspaces);

    const boards = await Board.find({ workspaceId: workspacesIds });
    const boardsIds = getEntityIds(boards);

    const lists = await List.find({ boardId: boardsIds });
    const listsIds = getEntityIds(lists);

    const cards = await Card.find({ listId: listsIds });

    const userStatsDto = new UserStatsDto(workspaces.length, boards.length, lists.length, cards.length);

    if (!workspaces && !boards && !lists && !cards) throw ApiError.NotFound();

    return userStatsDto;
  },
};

function getEntityIds(array) {
  const arrayIds = [];
  array.forEach((item) => {
    arrayIds.push(item._id);
  });

  return arrayIds;
}
