const { WebSocketServer } = require('ws');

function serverProxy(http)
{
    const socketServer = new WebSocketServer({server: http});

    socketServer.on('connection', (socket) => {
        socket.isAlive = true;

        socket.on('message', function message(data) {
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    setInterval(() => {
        socketServer.clients.forEach((client) => {
            if (client.isAlive === false) {
                return client.terminate();
            }

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}

module.exports = {serverProxy};