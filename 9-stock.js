import  express from 'express'
import redis from 'redis';
import {promisify} from 'util'

const app = express()
// Create a Redis client
const client = redis.createClient({
	host: '127.0.0.1',
	port: 6379,
  });
  

const listProducts = [
	{
		id: 1, 
		name: "Suitcase 250",
		price: 50,
		stock: 4
	},
	{
		id: 2,
		name: "Suitcase 450",
		price: 100,
		stock: 10
	},
	{
		id: 3,
		name: "Suitcase 650",
		price: 350,
		stock: 2
	},
	{
		id: 4,
		name: "Suitcase 1050",
		price: 550,
		stock: 5
	}
]

function getItemById(id) {
	const result = listProducts.filter(item => item.id === id)
	return result[0]
}

async function reserveStockById(itemId, stock) {
    const promisifiedClient = promisify(client.SET).bind(client);
    try {
        const item = getItemById(itemId);
        await promisifiedClient(item.id, JSON.stringify(stock));
    } catch (error) {
        console.log(error)
    }
}

async function getCurrentReservedStockById(itemId) {
    const promisifiedClient = promisify(client.GET).bind(client);
    try {
        const item = await promisifiedClient(itemId);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.log(error)
    }
}



app.get('/list_products', (req, res) => {
	res.statusCode = 200;
	res.json(listProducts)
})

app.get('/list_products/:itemId', async (req, res) => {
	res.statusCode = 200;

	const id =  parseInt(req.params['itemId'], 10);
	try {
		let item = await getCurrentReservedStockById(id)

		if (!item) {
			item = getItemById(id);
			if (item) {
				reserveStockById(id, item);
			} else {
				res.statusCode = 400;
				return res.json({message: `Item with id: ${id} not found`})
			}
		} 
		res.json(item)

	} catch (error) {
		console.log(error)
		res.statusCode = 500
		res.json({message: "An error occured."})
	}
})

const port = 1245
app.listen(port, () => {
	console.log("server running on port: ", port)
})
client.on('error', (err) => {
	console.error('Redis connection error:', err);
});