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

// Function to set a new school value in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, (error, reply) => {
    if (error) throw error;
    console.log(reply); // Confirmation message
  });
};

// Function to display the value for a given school key
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (error, reply) => {
    if (error) throw error;
    console.log(reply);
  });
};

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
