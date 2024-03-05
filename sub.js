const redis = require('redis');

const subscriber = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});


subscriber.on('error', (err) => {
  console.error('Redis client not connected to the server:', err);
});

subscriber.subscribe('Gvtech school channel')
subscriber.on('message', (channel, message) => {
	if (message === 'KILL_SERVER') {
		subscriber.unsubscribe(channel)
		subscriber.quit()
	}
	console.log(message)
})

subscriber.on('connect', () => console.log('Redis client connected to the server'))