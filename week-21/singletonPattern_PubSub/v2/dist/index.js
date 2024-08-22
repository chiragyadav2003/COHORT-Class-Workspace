"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PubSubManager_1 = require("./PubSubManager");
function Main() {
    setInterval(() => {
        const userId = Math.floor(Math.random() * 100 + 1).toString();
        PubSubManager_1.PubSubManager.getInstance().userSubscribe(userId, "APPLE");
    }, 5000);
}
Main();
