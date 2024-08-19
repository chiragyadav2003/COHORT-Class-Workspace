import { gameManager } from './store';

export const startLogger = () => {
  setInterval(() => {
    gameManager.logGames();
  }, 5000);
}