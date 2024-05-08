import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

// Redis client setup
const redisClient = redis.createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

// Kue queue setup
const queue = kue.createQueue();

// Express app setup
const app = express();
const port = 1245;

// Initialize the number of available seats to 50
const initialAvailableSeats = 50;
let reservationEnabled = true;

// Reserve a seat function
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// Get the current available seats
async function getCurrentAvailableSeats() {
  const availableSeats = await getAsync('available_seats');
  return parseInt(availableSeats) || 0;
}

// Routes

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save(err => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', result => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', err => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

// Route to process the queue and reserve seats
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  const currentAvailableSeats = await getCurrentAvailableSeats();

  if (currentAvailableSeats <= 0) {
    reservationEnabled = false;
  }

  if (currentAvailableSeats > 0) {
    const newAvailableSeats = currentAvailableSeats - 1;
    await reserveSeat(newAvailableSeats);
    if (newAvailableSeats === 0) {
      reservationEnabled = false;
    }
    if (newAvailableSeats >= 0) {
      queue.process('reserve_seat', async (job, done) => {
        done();
      });
    } else {
      queue.process('reserve_seat', async (job, done) => {
        done(new Error('Not enough seats available'));
      });
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
