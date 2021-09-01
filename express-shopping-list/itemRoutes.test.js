process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let items = require('./fakeDb');

let popsicle = { name: 'popsicle', price: 1.45 };

beforeEach(() => {
	items.push(popsicle);
});

afterEach(() => {
	items.length = 0;
});

// GET /items - this should render a list of shopping items.
describe('GET /items', () => {
	test('Get a list of shopping items', async () => {
		const res = await request(app).get('/items');
		expect(res.statusCode).toBe(200);

		expect(res.body).toEqual({ items: [ popsicle ] });
	});
});

// POST /items - this route should accept JSON data and add it to the shopping list.
describe('POST /items', () => {
	test('Add an item to the list of shopping items', async () => {
		const iceCream = { name: 'icecream', price: 5.5 };
		const res = await request(app).post('/items').send(iceCream);
		expect(res.statusCode).toBe(201);

		expect(res.body).toEqual({ added: iceCream });
	});
});

// GET /items/:name - this route should display a single item’s name and price.
describe('GET /items/:name', () => {
	test('Display a single item name and price', async () => {
		const res = await request(app).get(`/items/${popsicle.name}`);
		expect(res.statusCode).toBe(200);

		expect(res.body).toEqual({ item: popsicle });
	});

	test('Responds with 404 if cannot find item', async () => {
		const res = await request(app).get('/items/banana');
		expect(res.statusCode).toBe(404);
	});
});

// PATCH /items/:name, this route should modify a single item’s name and/or price
describe('PATCH /items/:name', () => {
	test('Modify a single item name and/or price', async () => {
		const chocolate = { name: 'chocolate', price: 2.5 };
		const res = await request(app).patch(`/items/${popsicle.name}`).send(chocolate);
		expect(res.statusCode).toBe(200);

		expect(res.body).toEqual({ updated: chocolate });
	});

	test('Responds with 404 if cannot find item', async () => {
		const res = await request(app).patch('/items/banana');
		expect(res.statusCode).toBe(404);
	});
});

// DELETE /items/:name - this route should allow you to delete a specific item from the array.
describe('DELETE /items/:name', () => {
	test('Delete an specific item from the list of shopping items', async () => {
		const res = await request(app).delete(`/items/${popsicle.name}`);
		expect(res.statusCode).toBe(200);

		expect(res.body).toEqual({ message: 'Deleted' });
	});
});
