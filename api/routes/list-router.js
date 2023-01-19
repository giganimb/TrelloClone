const Router = require('express');
const router = new Router();

const listController = require('../controllers/list-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const {
  getAllSchema,
  getListSchema,
  createListSchema,
  updateListSchema,
  deleteListSchema,
} = require('../validations/list-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/list/all', getAllSchema, validatePayload, authorizationMiddleware, listController.getAll);
router.get('/list/:id', getListSchema, validatePayload, authorizationMiddleware, listController.getList);
router.post('/list/', createListSchema, validatePayload, authorizationMiddleware, listController.createList);
router.patch('/list/:id', updateListSchema, validatePayload, authorizationMiddleware, listController.updateList);
router.delete('/list/:id', deleteListSchema, validatePayload, authorizationMiddleware, listController.deleteList);

module.exports = router;
