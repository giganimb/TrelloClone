const User = require('../models/User');
const ApiError = require('../errors/api-error');

module.exports = {
  async getUser(id) {
    const user = await User.findById(id);

    if (!user) throw ApiError.NotFound();

    return user;
  },
  async updateUser(id, body) {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) throw ApiError.NotFound();

    return updatedUser;
  },
};
