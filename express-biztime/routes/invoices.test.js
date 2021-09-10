process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');

let testComp;
let testInv;

beforeEach(async () => {
	const compResult = await db.query(
		`INSERT INTO companies(code, name, description)
        VALUES('cisco', 'cisco', 'best networking company')
        RETURNING code, name, description`
	);

	const invResult = await db.query(
		`INSERT INTO invoices(comp_code, amt)
        VALUES ('cisco', 100)
        RETURNING id, comp_code, add_date, amt, paid, paid_date`
	);
	testComp = compResult.rows[0];
	testInv = invResult.rows;
});

afterEach(async () => {
	await db.query(`DELETE FROM companies`);
	await db.query(`DELETE FROM invoices`);
});

afterAll(async () => {
	await db.end();
});

describe('GET /invoices', () => {
	test('Gets a list of invoices', async () => {
		const res = await request(app).get(`/invoices`);
		expect(res.status).toEqual(200);
	});
});

// describe('GET /invoices/:id', () => {
// 	test('Gets a single invoice', async () => {
// 		const res = await request(app).get(`/invoices/${testInv.code}`);
// 		expect(res.status).toEqual(200);
// 		testInv.invoices = testInv.map((r) => r.id);
// 		expect(res.body).toEqual({
// 			invoice: testInv,
// 		});
// 	});
// });

describe('POST /invoices', () => {
	test('Add a single invoice', async () => {
		const newInv = { comp_code: 'cisco', amt: 200 };
		const res = await request(app).post(`/invoices`).send(newInv);
		expect(res.status).toEqual(201);
		expect(res.body.invoice.comp_code).toEqual('cisco');
		expect(res.body.invoice.amt).toEqual(200);
	});
});

describe('PUT /invoices/:id', () => {
	test('Edit a single invoice', async () => {
		const res = await request(app).put(`/invoices/${testInv[0].id}`).send({ amt: 400 });
		expect(res.status).toEqual(200);
		expect(res.body.invoice.amt).toEqual(400);
	});

	test('Responds with 404 if cannot find an invoice', async () => {
		const res = await await request(app).put(`/invoices/49`);
		expect(res.status).toEqual(404);
	});
});

describe('DELETE /invoices/:id', () => {
	test('Delete a single invoice', async () => {
		const res = await request(app).delete(`/invoices/${testInv[0].id}`);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ status: 'deleted' });
	});

	test('Responds with 404 if cannot find an invoice', async () => {
		const res = await await request(app).delete(`/invoices/49`);
		expect(res.status).toEqual(404);
	});
});
