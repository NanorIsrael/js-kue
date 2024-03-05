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


module.exports = queue;
