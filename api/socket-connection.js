const io = require('socket.io');
let socketServer = null;

require('dotenv').config();

module.exports = (app, server) => {
  if (socketServer) return socketServer;

  socketServer = io(server, {
    cors: { origin: process.env.CLIENT_URL },
  });

  socketServer.on('connection', (socket) => {
    socket.on('join-panel', (boardId) => {
      socket.join(boardId);
    });
  });

  return socketServer;
};
