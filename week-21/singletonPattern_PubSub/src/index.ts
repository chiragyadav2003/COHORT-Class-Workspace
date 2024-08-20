import { GameManager } from './store';
import { startLogger } from './logger';

startLogger();

const updateGame = () => {
  setInterval(() => {
    const newId = Math.floor(Math.random() * 100).toString();
    // get current instance of GameManager class
    GameManager.getInstance().addGame(Math.floor(Math.random() * 10 + 1).toString())
  }, 5000);
}
updateGame()