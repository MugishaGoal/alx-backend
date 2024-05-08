import redis from 'redis';

const client = redis.createClient();

// Event listener for successful connection
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

// Event listener for connection errors
client.on('error', (error) => {
    console.error(`Redis client not connected to the server: ${error}`);
});
