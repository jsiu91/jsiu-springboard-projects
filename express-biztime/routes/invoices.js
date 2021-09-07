const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');

let router = new express.Router();

// GET /invoices
// Return info on invoices: like {invoices: [{id, comp_code}, ...]}
router.get('/', async (req, res, next) => {
	try {
		const compQuery = await db.query(`SELECT * FROM invoices ORDER BY id`);
		return res.json({ invoices: compQuery.rows });
	} catch (e) {
		return next(e);
	}
});

// GET /invoices/[id]
// Returns obj on given invoice.
// If invoice cannot be found, returns 404.
// Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
router.get('/:id', async (req, res, next) => {
	try {
		const result = await db.query(
			`SELECT i.id, 
                    i.comp_code, 
                    i.amt, 
                    i.paid, 
                    i.add_date, 
                    i.paid_date, 
                    c.name, 
                    c.description
            FROM invoices AS i
            INNER JOIN companies AS c on(i.comp_code = c.code)
            WHERE id=$1`,
			[ req.params.id ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no invoice with id of ${req.param.id}`, 404);
		}
		const data = result.rows[0];
		const invoice = {
			id: data.id,
			amt: data.amt,
			paid: data.paid,
			add_date: data.add_date,
			paid_late: data.paid_date,
			company: {
				code: data.comp_code,
				name: data.name,
				description: data.description,
			},
		};
		return res.json({ invoice: invoice });
	} catch (e) {
		return next(e);
	}
});

// POST /invoices
// Adds an invoice.
// Needs to be passed in JSON body of: {comp_code, amt}
// Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post('/', async (req, res, next) => {
	try {
		const result = await db.query(
			`INSERT INTO invoices(comp_code, amt)
            VALUES ($1, $2) 
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
			[ req.body.comp_code, req.body.amt ]
		);

		return res.status(201).json({ invoice: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

// PUT /invoices/[id]
// Updates an invoice.
// If invoice cannot be found, returns a 404.
// Needs to be passed in a JSON body of {amt}
// Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.put('/:id', async (req, res, next) => {
	try {
		const result = await db.query(
			`UPDATE invoices
            SET amt= $1
            WHERE id=$2
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
			[ req.body.amt, req.params.id ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no invoice with id of ${req.params.id}`, 404);
		}

		return res.json({ invoice: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

// DELETE /invoices/[id]
// Deletes an invoice.
// If invoice cannot be found, returns a 404.
// Returns: {status: "deleted"}
router.delete('/:id', async (req, res, next) => {
	try {
		const result = await db.query(`DELETE FROM invoices WHERE id=$1 RETURNING id`, [ req.params.id ]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no invoice with id of ${req.params.id}`, 404);
		}

		return res.json({ status: 'deleted' });
	} catch (e) {
		return next(e);
	}
});
// Also, one route from the previous part should be updated:

// GET /companies/[code]
// Return obj of company: {company: {code, name, description, invoices: [id, ...]}}
// If the company given cannot be found, this should return a 404 status response.

module.exports = router;
