const Card = require('../models/Card');
const ApiError = require('../errors/api-error');

module.exports = {
  async getAll(query) {
    const { listId } = query;
    const cards = await Card.find({ listId }).sort([['position', 'ascending']]);

    if (!cards) throw ApiError.NotFound();

    return cards;
  },

  async getCard(id) {
    const card = await Card.findById(id);

    if (!card) throw ApiError.NotFound();

    return card;
  },

  async createCard(body) {
    const { name, description, listId } = body;

    const cardsCountOfThisList = (await Card.find({ listId })).length;
    const position = cardsCountOfThisList + 1 || 1;

    const card = Card.create({ name: name, position: position, description: description, listId: listId });

    return card;
  },

  async updateCard(id, body) {
    const updatedCard = await Card.findByIdAndUpdate(id, body, { new: true });

    if (!updatedCard) throw ApiError.NotFound();

    return updatedCard;
  },

  async deleteCard(id) {
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) throw ApiError.NotFound();

    this.changePositionsOnDelete(deletedCard);

    return deletedCard;
  },

  async updateCardsBetweenLists(body) {
    let card = await Card.findOne({ listId: body.from.listId, position: body.from.cardPosition });

    const deletedCard = await Card.findByIdAndDelete(card._id);

    if (!deletedCard) throw ApiError.NotFound();

    this.changePositionsOnDelete(deletedCard);

    await Card.updateMany(
      { listId: `${body.to.listId}`, position: { $gte: body.to.cardPosition + 1 } },
      { $inc: { position: 1 } }
    );

    const movedCard = await Card.create({
      name: card.name,
      position: body.to.cardPosition + 1,
      description: card.description,
      listId: body.to.listId,
    });

    return movedCard;
  },

  async changePositionsOnDelete(deletedCard) {
    const { listId, position } = deletedCard;
    await Card.updateMany({ listId: `${listId}`, position: { $gt: position } }, { $inc: { position: -1 } });
  },
};
