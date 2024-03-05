const redis = require('redis');
const {promisify} = require('util')

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});


client.on('error', (err) => {
  console.error('Redis connection error:', err);
});


async function displayValue(value) {
	const promisifiedGet = promisify(client.GET).bind(client);

	try {
		const val = await promisifiedGet(value)
		return console.log(val)
	} catch (error) {
		console.error('Error getting value:', error);
	}
}

async function setNewSchool(schoolName, value) {
	const promisifiedSet = promisify(client.SET).bind(client);
	try {
		await promisifiedSet(schoolName, value)
		redis.print('Reply: Ok')
	} catch (error) {
		console.error('Error getting value:', error);
	}
}

async function main() {
	await displayValue('mykey');
	await setNewSchool("schoolName", "gvtech");
	await displayValue("schoolName")
	client.HSET('gvtech', 'Portland', '50', redis.print)
	client.HSET('gvtech', 'Seattle', '80', redis.print)
	client.HSET('gvtech', 'New York', '20', redis.print)
	client.HSET('gvtech', 'Bogota', '20', redis.print)
	client.HSET('gvtech', 'Cali', '40', redis.print)
	client.HSET('gvtech', 'Paris', '2', redis.print)
	client.HGETALL('gvtech', (err, val) => {
		if (err) {
			console.log(err)
		}
		console.log(val)
	})
}


// Handle connection and error events
client.on('connect', async() => {
	console.log('Connected to Redis');
	await main()
});

// // Remember to quit the client when done
// // client.quit();
