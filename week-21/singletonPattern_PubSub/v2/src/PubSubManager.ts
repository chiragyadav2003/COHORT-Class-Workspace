import { createClient, RedisClientType } from 'redis';

export class PubSubManager {
  private static instance: PubSubManager;

  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  // The constructor is marked private, so the class can only be instantiated internally
  //This enforces the Singleton pattern.
  private constructor() {
    // create redis client and connect to the redis server
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  //this static method controls access to the singleton instance
  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }

  public userSubscribe(userId: string, stock: string) {
    // Checks if there are already subscriptions for the stock. 
    // If not, it initializes an empty array for that stock. 
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }

    //Adds the user to the list of subscribers for the stock.
    this.subscriptions.get(stock)?.push(userId);

    //this will execute when we get our first subscriber for that stock
    //checking for only first subscriber i.e, count == 1, to avoid re-subscribing for same stock
    if (this.subscriptions.get(stock)?.length === 1) {
      //* callback function (message) => this.handleMessage(stock, message) is registered as the event handler for messages on that channel. Essentially, whenever Redis receives a message on that channel, this callback function is triggered.
      //* whenever redis receives a message on stock channel, the callback is triggered and this calls the handleMessage() with the stock name ans message
      this.redisClient.subscribe(stock, (message) => {
        this.handleMessage(stock, message);
      });
      console.log(`Subscribes to Redis channel : ${stock}`);
    }

  }

  public userUnSubscribe(userId: string, stock: string) {
    //Removes the user from the list of subscribers for the stock.
    this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter((sub) => sub !== userId) || []);

    //if we have no interested user in the current stock, unsubscribe to it
    if (this.subscriptions.get(stock)?.length === 0) {
      this.redisClient.unsubscribe(stock);
      console.log(`Unsubscribed to Redis channel : ${stock}`);
    }
  }

  // this method will be called when a message is published to the subscribed channel
  private handleMessage(stock: string, message: string) {
    console.log(`Message received on channel ${stock} : ${message}`);
    //here sub == userId
    this.subscriptions.get(stock)?.forEach((sub) => {
      console.log(`Sending message to the user :${sub}`)
    })
  }

  // cleanup on instance destruction
  public async disconnect() {
    await this.redisClient.disconnect();
  }
}