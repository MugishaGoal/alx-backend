// Import the required library
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Define the job data
const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, this is a notification message!',
};

// Create a job and add it to the queue
const job = queue.create('push_notification_code', jobData);

// Event handler when the job is created
job.on('enqueue', () => {
  console.log(`Notification job created: ${job.id}`);
});

// Event handler when the job is completed
job.on('complete', () => {
  console.log('Notification job completed');
});

// Event handler when the job fails
job.on('failed', () => {
  console.log('Notification job failed');
});

// Save the job to the queue
job.save((error) => {
  if (error) {
    console.error('Error creating job:', error);
  }
});
