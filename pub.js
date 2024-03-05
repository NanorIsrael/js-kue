const redis = require('redis');

const publisher = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});


publisher.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

function publishMessage(message, time) {
	console.log('About to send ' + message);
	setTimeout(() => {
		publisher.publish('Gvtech school channel', message);
	}
	, time);
}

publisher.on('connect', () => { 
	console.log('Redis client connected to the server')
	publishMessage("Gvtech Student #1 starts course", 100);
	publishMessage("Gvtech Student #2 starts course", 200);
	publishMessage("KILL_SERVER", 300);
	publishMessage("Gvtech Student #3 starts course", 400);
})
