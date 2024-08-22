import { PubSubManager } from './PubSubManager';

function Main() {
  setInterval(() => {
    const userId = Math.floor(Math.random() * 100 + 1).toString();
    PubSubManager.getInstance().userSubscribe(userId, "APPLE");
  }, 5000);
}

Main()