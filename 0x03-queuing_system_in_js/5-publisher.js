// Import the required library
import redis from 'redis';

// Create a Redis client
const publisher = redis.createClient();

// Function to handle connection errors
publisher.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Function to handle connection success
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to publish a message after a certain time
const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    publisher.publish('holberton school', message);
  }, time);
};

// Call the publishMessage function with different messages and times
publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);

