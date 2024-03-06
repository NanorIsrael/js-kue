// Import the necessary modules and functions
import { expect } from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job';

// Describe the test suite for createPushNotificationsJobs
describe('createPushNotificationsJobs', () => {
  // Define a mock Kue queue
  let queue;

  // Set up the queue before each test
  beforeEach(() => {
    queue = {
      create: sinon.stub().returnsThis(),
      on: sinon.stub().returnsThis(),
      save: sinon.stub(),
    };
  });

  // Test case for creating a single job
  it('should create a single job', () => {
    // Define the job data
    const jobs = [{
      phoneNumber: '1234567890',
      message: 'Test message',
    }];

    // Call the function with the mock queue
    createPushNotificationsJobs(jobs, queue);

    // Assertions
    expect(queue.create.calledOnce).to.be.true;
    expect(queue.on.calledWith('enqueue')).to.be.true;
    expect(queue.on.calledWith('complete')).to.be.true;
    expect(queue.on.calledWith('failed')).to.be.true;
    expect(queue.on.calledWith('progress')).to.be.true;
    expect(queue.save.calledOnce).to.be.true;
  });

  // Test case for handling non-array input
  it('should throw an error for non-array input', () => {
    // Define the job data (non-array)
    const jobs = 'not an array';

    // Assertion for throwing an error
    expect(() => createPushNotificationsJobs(jobs, queue)).to.throw('Jobs is not an array');
  });
});
