'use strict';

const db = require('../db.js');
const { BadRequestError, NotFoundError } = require('../expressError');
const Job = require('./job.js');
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testJobIds } = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe('create', function () {
	const newJob = {
		title: 'New',
		salary: 400000,
		equity: '0',
		companyHandle: 'c1',
	};

	test('works', async function () {
		let job = await Job.create(newJob);
		expect(job).toEqual({
			id: expect.any(Number),
			...newJob,
		});
	});
});

/************************************** findAll */

describe('findAll', function () {
	test('works: no filter', async function () {
		let jobs = await Job.findAll();
		expect(jobs).toEqual([
			{
				id: expect.any(Number),
				title: 'J1',
				salary: 100000,
				equity: '0',
				companyHandle: 'c1',
				companyName: 'C1',
			},
			{
				id: expect.any(Number),
				title: 'J2',
				salary: 50000,
				equity: '0',
				companyHandle: 'c2',
				companyName: 'C2',
			},
			{
				id: expect.any(Number),
				title: 'J3',
				salary: 300000,
				equity: '0',
				companyHandle: 'c3',
				companyName: 'C3',
			},
		]);
	});

	test('works: min salary', async function () {
		let jobs = await Job.findAll({ minSalary: 100000 });
		expect(jobs).toEqual([
			{
				id: expect.any(Number),
				title: 'J1',
				salary: 100000,
				equity: '0',
				companyHandle: 'c1',
				companyName: 'C1',
			},
			{
				id: expect.any(Number),
				title: 'J3',
				salary: 300000,
				equity: '0',
				companyHandle: 'c3',
				companyName: 'C3',
			},
		]);
	});

	test('works: has Equity', async function () {
		let jobs = await Job.findAll({ hasEquity: false });
		expect(jobs).toEqual([
			{
				id: expect.any(Number),
				title: 'J1',
				salary: 100000,
				equity: '0',
				companyHandle: 'c1',
				companyName: 'C1',
			},
			{
				id: expect.any(Number),
				title: 'J2',
				salary: 50000,
				equity: '0',
				companyHandle: 'c2',
				companyName: 'C2',
			},
			{
				id: expect.any(Number),
				title: 'J3',
				salary: 300000,
				equity: '0',
				companyHandle: 'c3',
				companyName: 'C3',
			},
		]);
	});

	test('works: title', async function () {
		let jobs = await Job.findAll({ title: '1' });
		expect(jobs).toEqual([
			{
				id: expect.any(Number),
				title: 'J1',
				salary: 100000,
				equity: '0',
				companyHandle: 'c1',
				companyName: 'C1',
			},
		]);
	});
});

/************************************** get */

describe('get', function () {
	test('works', async function () {
		let job = await Job.get(testJobIds[0]);
		expect(job).toEqual({
			id: testJobIds[0],
			title: 'J1',
			salary: 100000,
			equity: '0',
			companyHandle: 'c1',
		});
	});

	test('not found if no such job', async function () {
		try {
			await Job.get(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** update */

describe('update', function () {
	const updateData = {
		title: 'J1',
		salary: 200000,
		equity: '0.1',
	};

	test('works', async function () {
		let job = await Job.update(testJobIds[0], updateData);
		expect(job).toEqual({
			id: testJobIds[0],
			companyHandle: 'c1',
			...updateData,
		});
	});

	test('not found if no such job', async function () {
		try {
			await Job.update(0, { title: 'nope' });
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test('bad request with no data', async function () {
		try {
			await Job.update(testJobIds[0], {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe('remove', function () {
	test('works', async function () {
		await Job.remove(testJobIds[0]);
		const res = await db.query(`SELECT id FROM jobs WHERE id=$1`, [ testJobIds[0] ]);
		expect(res.rows.length).toEqual(0);
	});

	test('not found if no such job', async function () {
		try {
			await Job.remove(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
