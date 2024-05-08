// Import the required library
import kue from 'kue';

// Create an array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Create a function to send notifications
const sendNotification = (phoneNumber, message, job, done) => {
  // Track the progress of the job
  job.progress(0, 100);

  // Check if the phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job if the phoneNumber is blacklisted
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Update job progress
  job.progress(50, 100);

  // Log the notification message
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Mark the job as completed
  done();
};

// Create a queue with Kue
const queue = kue.createQueue();

// Process jobs of the queue 'push_notification_code_2' with two jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  // Extract job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message, job, done);
});
