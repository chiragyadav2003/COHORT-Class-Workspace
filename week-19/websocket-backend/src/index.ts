import WebSocket, { WebSocketServer } from 'ws';
import http from "http";


const httpServer = http.createServer(function (request: any, response: any) {
    console.log(new Date() + `Received request for ` + request.url);
    response.end('hi there');
});

//creating wss - web socket server instance
const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on('connection', function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', function message(data, isBinary) {
        wss.clients.forEach(function eachClient(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    console.log("User connected : userCount = ", ++userCount)
    socket.send('Hello! Message from the server ....')
});


httpServer.listen(8080, () => {
    console.log(new Date() + ' server is listening on port 8080...')
});