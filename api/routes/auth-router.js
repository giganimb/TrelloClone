const Router = require('express');
const router = new Router();

const authorizationController = require('../controllers/auth-controller');
const { signupSchema, loginSchema } = require('../validations/auth-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.post('/auth/signup', signupSchema, validatePayload, authorizationController.signup);
router.post('/auth/login', loginSchema, validatePayload, authorizationController.login);
router.post('/auth/logout', authorizationController.logout);
router.get('/auth/refresh', authorizationController.refresh);

module.exports = router;
