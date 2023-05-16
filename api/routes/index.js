const authRouter = require('./auth-router');
const adminRouter = require('./admin-router');
const userRouter = require('./user-router');
const workspaceRouter = require('./workspace-router');
const boardRouter = require('./board-router');
const listRouter = require('./list-router');
const cardRouter = require('./card-router');
const youcomApiRouter = require('./youcom-api-router');

module.exports = {
  routes: [authRouter, adminRouter, userRouter, workspaceRouter, boardRouter, listRouter, cardRouter, youcomApiRouter],
};
