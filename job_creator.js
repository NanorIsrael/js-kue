const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: '1234567890',
  message: 'Hello, world!'
};

const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log('Notification job created:', job.id);
    }
});
// Event handlers for completed and failed jobs
queue.on('job complete', (id) => {
	console.log('Notification job completed');
});
queue.on('job failed', (id, err) => {
	console.log('Notification job failed');
});

module.exports = queue;
