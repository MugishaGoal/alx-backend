import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';
import { expect } from 'chai';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    // Create a queue with Kue
    queue = kue.createQueue();
    // Enter test mode without processing the jobs
    queue.testMode.enter();
  });

  afterEach(() => {
    // Clear the queue and exit test mode after executing the tests
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('display a error message if jobs is not an array', () => {
    // Invoke createPushNotificationsJobs with invalid jobs data
    expect(() => createPushNotificationsJobs('invalid', queue)).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    // Define sample jobs
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account'
      }
    ];

    // Invoke createPushNotificationsJobs with sample jobs data
    createPushNotificationsJobs(jobs, queue);

    // Assert that two jobs are created in the queue
    expect(queue.testMode.jobs.length).to.equal(2);
    // Assert that the job contains the correct data
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql(jobs[0]);
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.eql(jobs[1]);
  });
});
