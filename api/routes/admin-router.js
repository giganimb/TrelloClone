const Router = require('express');
const router = new Router();

const adminController = require('../controllers/admin-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const roleMiddleware = require('../middlewares/role-middleware');
const { deleteUserSchema, getUserStatisticsSchema } = require('../validations/admin-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/admin/get-users', authorizationMiddleware, roleMiddleware(['admin']), adminController.getUsers);
router.delete(
  '/admin/delete-user/:id',
  deleteUserSchema,
  validatePayload,
  authorizationMiddleware,
  roleMiddleware(['admin']),
  adminController.deleteUser
);
router.get(
  '/admin/get-user-statistics',
  getUserStatisticsSchema,
  validatePayload,
  authorizationMiddleware,
  roleMiddleware(['admin']),
  adminController.getUserStatistics
);

module.exports = router;
