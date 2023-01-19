const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./utils/responseHelper');

require('dotenv').config();

const { initMongoDB } = require('./utils/initServerUtils');

if (!process.env.MONGODB_URL || !process.env.PORT) {
  throw new Error('.env file not found or corrupted');
}

const app = express();
const server = require('http').createServer(app);
require('./socket-connection')(app, server);

initMongoDB(mongoose);
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.disable('x-powered-by');
app.disable('server');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const { routes } = require('./routes/index');
routes.forEach((rote) => {
  app.use('/api/v1', rote);
});

app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log('Server is listening on Port:', process.env.PORT);
});

module.exports.app = app;
