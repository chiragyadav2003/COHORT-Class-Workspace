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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
class PubSubManager {
    //private constructor ensure that no object can be created outside the class
    //we will instantiate the object in static function getInstance :singleton class
    constructor() {
        // create redis client and connect to the redis server
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    //this static method controls access to the singleton instance
    static getInstance() {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }
    userSubscribe(userId, stock) {
        var _a, _b;
        // if we do not have current stock, then add that stock 
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.push(userId);
        //if we get user count == 1, for a stock, subscribe to that stock
        // checking for count = 1, to avoid re-subscribing
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribes to Redis channel : ${stock}`);
        }
    }
    userUnSubscribe(userId, stock) {
        var _a, _b;
        this.subscriptions.set(stock, ((_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.filter((sub) => sub !== userId)) || []);
        //if we have no interested user in the current stock, unsubscribe to it
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`Unsubscribed to Redis channel : ${stock}`);
        }
    }
    // this method will be called when a message is published to the subscribed channel
    handleMessage(stock, message) {
        var _a;
        console.log(`Message received on channel ${stock} : ${message}`);
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((sub) => {
            console.log(`Sending message to the user :${sub}`);
        });
    }
    // cleanup on instance destruction
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.disconnect();
        });
    }
}
exports.PubSubManager = PubSubManager;
