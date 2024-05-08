// Import the required library
import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient();

// Function to handle connection errors
subscriber.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Function to handle connection success
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Subscribe to the "holberton school" channel
subscriber.subscribe('holberton school');

// Function to handle incoming messages
subscriber.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe('holberton school');
    subscriber.quit();
  }
});
