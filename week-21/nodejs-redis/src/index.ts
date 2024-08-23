import express from 'express';
import { createClient } from 'redis';
import axios from 'axios';

const app = express();


const client = createClient();
(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis successfully!');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

const PORT = 3000;
const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(USERS_API)
    const users = response.data;
    console.log('Users retrieved from the API');
    res.status(200).send(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.get('/cached-users', async (req, res) => {
  try {
    const cachedUsers = await client.get('users');
    if (cachedUsers) {
      console.log('users retrieved from Redis');
      res.status(200).send(JSON.parse(cachedUsers));
    }
    else {
      const response = await axios.get(USERS_API)
      const users = response.data;
      await client.setEx('users', 600, JSON.stringify(users));
      console.log("Users retrieved from the API");
      res.status(200).send(users);
    }
  } catch (error) {
    console.error('Error in /cached-users route:', error);
    res.status(500).send({ error: 'Something went wrong!' });
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port :${PORT}`)
})