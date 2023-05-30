const Router = require('express');
const router = new Router();

const youcomApiController = require('../controllers/youchat-api-controller');

router.get('/solve-card-task', youcomApiController.solveCardTask);
router.get('/summarize-card-description', youcomApiController.summarizeCardDescription);

module.exports = router;
