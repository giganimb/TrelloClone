const Router = require('express');
const router = new Router();

const cardController = require('../controllers/card-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const {
  getAllSchema,
  getCardSchema,
  createCardSchema,
  updateCardSchema,
  deleteCardSchema,
} = require('../validations/card-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/card/all', getAllSchema, validatePayload, authorizationMiddleware, cardController.getAll);
router.get('/card/:id', getCardSchema, validatePayload, authorizationMiddleware, cardController.getCard);
router.post('/card/', createCardSchema, validatePayload, authorizationMiddleware, cardController.createCard);
router.patch('/card/:id', updateCardSchema, validatePayload, authorizationMiddleware, cardController.updateCard);
router.delete('/card/:id', deleteCardSchema, validatePayload, authorizationMiddleware, cardController.deleteCard);
router.post('/moveCard/', authorizationMiddleware, cardController.updateCardsBetweenLists);

module.exports = router;
