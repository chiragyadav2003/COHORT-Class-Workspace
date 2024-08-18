import { games } from './store';
import { startLogger } from './logger';

startLogger();

const updateGame = () => {
  setInterval(() => {
    const newId = Math.floor(Math.random() * 100).toString();
    games.push({
      id: newId,
      whitePlayer: `Alice ${newId}`,
      blackPlayer: `Bob ${newId}`,
      moves: []
    })
  }, 5000);
}
updateGame()