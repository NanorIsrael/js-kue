const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, world!'
};

// Create a job
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log('Notification job created:', job.id);
    }
  });

// Process the job
queue.process('push_notification_code', (job, done) => {
  // Simulate a failure
  // done(new Error('Failed to send notification'));

  // Simulate a successful job
  console.log('Sending notification:', job.data);
  done();
});

// Event handlers for completed and failed jobs
queue.on('job complete', (id) => {
  console.log('Notification job completed');
});

queue.on('job failed', (id, err) => {
  console.log('Notification job failed');
});

module.exports = queue;
