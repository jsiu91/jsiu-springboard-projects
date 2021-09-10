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
        RETURNING id, comp_code`
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

describe('GET /companies', () => {
	test('Gets a list of companies', async () => {
		const res = await request(app).get(`/companies`);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({
			companies: [ testComp ],
		});
	});
});

describe('GET /companies/:code', () => {
	test('Gets a single company', async () => {
		const res = await request(app).get(`/companies/${testComp.code}`);
		expect(res.status).toEqual(200);
		testComp.invoices = testInv.map((r) => r.id);
		expect(res.body).toEqual({
			company: testComp,
		});
	});
});

describe('POST /companies', () => {
	test('Add a single company', async () => {
		const newComp = { code: 'google', name: 'google', description: 'FAANG' };
		const res = await request(app).post(`/companies`).send(newComp);
		expect(res.status).toEqual(201);
		expect(res.body).toEqual({ company: newComp });
	});
});

describe('PUT /companies/:code', () => {
	test('Edit a single company', async () => {
		const res = await request(app)
			.put(`/companies/${testComp.code}`)
			.send({ name: 'frisco', description: 'not so cool' });
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({
			company: { code: `${testComp.code}`, name: 'frisco', description: 'not so cool' },
		});
	});

	test('Responds with 404 if cannot find a company code', async () => {
		const res = await await request(app).put(`/companies/google`);
		expect(res.status).toEqual(404);
	});
});

describe('DELETE /company/:code', () => {
	test('Delete a single company', async () => {
		const res = await request(app).delete(`/companies/${testComp.code}`);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual({ status: 'deleted' });
	});

	test('Responds with 404 if cannot find a company code', async () => {
		const res = await await request(app).delete(`/companies/google`);
		expect(res.status).toEqual(404);
	});
});
