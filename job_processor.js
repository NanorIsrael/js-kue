const kue = require('kue');
const queue = kue.createQueue();


// Process the job
queue.process('push_notification_code', (job, done) => {
	// Simulate a failure
	// done(new Error('Failed to send notification'));
	sendNotification(job.data['phoneNumber'], job.data['message'])
	done();
});


// Listen to the queue
queue.on('ready', () => {
	queue.process('push_notification_code', (job, done) => {
	  console.log('Processing job:', job.id);
	  // Simulate a successful job
	  done();
	});
});
  
queue.on('error', (err) => {
	console.log('Queue error:', err);
});



function sendNotification(phoneNumber, message) {
	// Event handlers for completed and failed jobs
	queue.on('job complete', () => {
		console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
	});

	queue.on('job failed', (id, err) => {
		console.log('Notification job failed');
	});
}
