interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[]
}

// export const games: Game[] = [];

//create class GameManager, which will handle state
export class GameManager {
  games: Game[] = []; //array storing the current games.

  constructor() {
    this.games = [];
  }

  addMove(gameId: string, move: string) {
    console.log(`Adding move ${move} to game ${gameId}`);
    const game = this.games.find(game => game.id == gameId);
    game?.moves.push(move);
  }

  addGame(gameId: string) {
    const game = {
      id: gameId,
      whitePlayer: `Alice ${gameId}`,
      blackPlayer: `Bob ${gameId}`,
      moves: []
    }
    this.games.push(game);
  }

  logGames() {
    console.log(this.games)
  }
}

/**
 * create single instance and export it from store to avoid case of circular dependency
*  circular dependency occur when we create object in index.ts and then we export that object and use it in logger.ts, here dependency is like 
* store.ts(gameManager class) <- index.ts(gameManager class object) <- logger.ts (object from index)
 */

export const gameManager = new GameManager();
