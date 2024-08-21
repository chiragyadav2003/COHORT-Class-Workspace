interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[]
}




/**
 * updating class with singleton pattern for a better approach
 * his pattern will ensure that we will have only single instance of our class in the codebase
 * * static attributes are associated with class, not with the object of the class
 */
export class GameManager {
  //games is associated with object
  private games: Game[] = [];

  /**
   * create a static attribute 'instance' which will be associated with the class
   * we will use this attribute to check if current class has an existing instance or not
   */
  private static instance: GameManager;

  // *Private constructor ensures that a new instance cannot be created from outside
  private constructor() {
    this.games = [];
  }

  public static getInstance() {
    //check if current class has an existing instance(object) or not, if not then create one
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
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
// export const gameManager = new GameManager();

