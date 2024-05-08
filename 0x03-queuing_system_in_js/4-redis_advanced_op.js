// Import the required library
import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Function to handle connection errors
client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

// Function to handle connection success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Function to create and store a hash in Redis
const createHash = () => {
  client.hset(
    'HolbertonSchools',
    'Portland',
    50,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Seattle',
    80,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'New York',
    20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Bogota',
    20,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Cali',
    40,
    redis.print
  );
  client.hset(
    'HolbertonSchools',
    'Paris',
    2,
    redis.print
  );
};

// Function to display the hash stored in Redis
const displayHash = () => {
  client.hgetall('HolbertonSchools', (error, reply) => {
    if (error) throw error;
    console.log(reply);
  });
};

// Call the functions
createHash();
setTimeout(displayHash, 1000);
