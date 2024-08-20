import { GameManager } from './store';

export const startLogger = () => {
  setInterval(() => {
    GameManager.getInstance().logGames();
  }, 5000);
}