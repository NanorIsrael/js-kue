const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});


client.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

const subscriber = client.duplicate()
const publisher = client.duplicate()

publisher.publish('mychannel', "Hello you")

subscriber.subscribe('mychannel')
subscriber.on('message', (channel, message) => publishMessage(channel, message, 1000))

function publishMessage(channel, message, time) {
	console.log('About to send MESSAGE');
	setInterval(() => console.log(channel, message) , time);
}


client.on('connect',async () => {
    console.error('Redis client connected to the server');
});
