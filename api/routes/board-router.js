const Router = require('express');
const router = new Router();

const boardController = require('../controllers/board-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const {
  getAllSchema,
  getBoardSchema,
  createBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
} = require('../validations/board-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/board/all', getAllSchema, validatePayload, authorizationMiddleware, boardController.getAll);
router.get('/board/:id', getBoardSchema, validatePayload, authorizationMiddleware, boardController.getBoard);
router.post('/board/', createBoardSchema, validatePayload, authorizationMiddleware, boardController.createBoard);
router.patch('/board/:id', updateBoardSchema, validatePayload, authorizationMiddleware, boardController.updateBoard);
router.delete('/board/:id', deleteBoardSchema, validatePayload, authorizationMiddleware, boardController.deleteBoard);

module.exports = router;
