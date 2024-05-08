// Import the required library
import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Define the function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process new jobs on the queue named 'push_notification_code'
queue.process('push_notification_code', (job, done) => {
  // Extract data from the job
  const { phoneNumber, message } = job.data;

  // Call the function to send notification
  sendNotification(phoneNumber, message);

  // Indicate the completion of the job processing
  done();
});
