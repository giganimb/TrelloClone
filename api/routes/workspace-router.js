const Router = require('express');
const router = new Router();

const workspaceController = require('../controllers/workspace-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const {
  getAllSchema,
  getWorkspaceSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  deleteWorkspaceSchema,
} = require('../validations/workspace-validation');
const { validatePayload } = require('../middlewares/validate-payload-middleware');

router.get('/workspace/all', getAllSchema, validatePayload, authorizationMiddleware, workspaceController.getAll);
router.get(
  '/workspace/:id',
  getWorkspaceSchema,
  validatePayload,
  authorizationMiddleware,
  workspaceController.getWorkspace
);
router.post(
  '/workspace/',
  createWorkspaceSchema,
  validatePayload,
  authorizationMiddleware,
  workspaceController.createWorkspace
);
router.patch(
  '/workspace/:id',
  updateWorkspaceSchema,
  validatePayload,
  authorizationMiddleware,
  workspaceController.updateWorkspace
);
router.delete(
  '/workspace/:id',
  deleteWorkspaceSchema,
  validatePayload,
  authorizationMiddleware,
  workspaceController.deleteWorkspace
);
router.post('/workspace/addUser', authorizationMiddleware, workspaceController.addUserToWorkspace);
router.post('/workspace/deleteUser', authorizationMiddleware, workspaceController.deleteUserFromWorkspace);
router.get('/workspace/:id/getMembers', authorizationMiddleware, workspaceController.getWorkspaceMembers);

module.exports = router;
