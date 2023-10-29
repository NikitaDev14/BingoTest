const http = require('http');
const server = http.createServer();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const PORT = 8080;
const MESSAGE_POOL_SIZE = 9;

function messagePool() {
    let messages = [];

    return {
        addMessage: (message) => {
            messages = [
                ...messages.slice(MESSAGE_POOL_SIZE * -1),
                message,
            ];
        },
        getMessages: () => {
            return messages;
        },
    };
}

const messagePoolInstance = messagePool();

wss.on('connection', (ws) => {
    messagePoolInstance.getMessages().forEach((message) => {
        ws.send(message);
    });

    ws.on('message', (message) => {
        messagePoolInstance.addMessage(message.toString());

        wss.clients.forEach((client) => {
            client.send(message.toString());
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
