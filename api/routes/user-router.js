const Router = require('express');
const router = new Router();

const userController = require('../controllers/user-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const { updateUserSchema, getUserSchema } = require('../validations/user-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/profile/:id', getUserSchema, validatePayload, authorizationMiddleware, userController.getUser);
router.patch('/profile/:id', updateUserSchema, validatePayload, authorizationMiddleware, userController.updateUser);

module.exports = router;
