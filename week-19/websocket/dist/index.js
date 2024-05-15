"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(function (request, response) {
    console.log(new Date() + `Received request for ` + request.url);
    response.end('hi there');
});
server.listen(8080, () => {
    console.log(new Date() + ' server is listening on port 8080');
});
