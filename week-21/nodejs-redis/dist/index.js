"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log('Connected to Redis successfully!');
    }
    catch (err) {
        console.error('Error connecting to Redis:', err);
    }
}))();
const PORT = 3000;
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(USERS_API);
        const users = response.data;
        console.log('Users retrieved from the API');
        res.status(200).send(users);
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send({ error: 'Something went wrong' });
    }
}));
app.get('/cached-users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedUsers = yield client.get('users');
        if (cachedUsers) {
            console.log('users retrieved from Redis');
            res.status(200).send(JSON.parse(cachedUsers));
        }
        else {
            const response = yield axios_1.default.get(USERS_API);
            const users = response.data;
            yield client.setEx('users', 600, JSON.stringify(users));
            console.log("Users retrieved from the API");
            res.status(200).send(users);
        }
    }
    catch (error) {
        console.error('Error in /cached-users route:', error);
        res.status(500).send({ error: 'Something went wrong!' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
});
