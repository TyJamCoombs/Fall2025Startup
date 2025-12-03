const { WebSocketServer } = require('ws');
const DB = require('./database.js');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    socket.on('message', async (data) => {
      try {
        const parsed = JSON.parse(data);

        if (parsed.text) {
          await DB.addExcuse(parsed, parsed.userEmail);
          const excuses = await DB.getExcuses();

          console.log("Broadcasting:", excuses);

          socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ leaderboard: excuses }));
            }
          });
        }
      } catch (err) {
        console.error("Bad message:", data, err);
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });
  });

  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };