const express = require('express');
const ExpressError = require('../expressError');
const slugify = require('slugify');
const db = require('../db');

let router = new express.Router();

// GET /companies
// Returns list of companies, like {companies: [{code, name}, ...]}
router.get('/', async (req, res, next) => {
	try {
		const compQuery = await db.query(`SELECT * FROM companies`);
		return res.json({ companies: compQuery.rows });
	} catch (e) {
		return next(e);
	}
});

// GET /companies/[code]
// Return obj of company: {company: {code, name, description}}
router.get('/:code', async (req, res, next) => {
	try {
		const compResult = await db.query(
			`SELECT c.code, c.name, c.description, i.name
                FROM companies AS c
                    LEFT JOIN companies_industries AS ci
                    ON c.code = ci.comp_code
                    LEFT JOIN industries as i
                    ON ci.ind_code = i.code
                    WHERE c.code = $1`,
			[ req.params.code ]
		);

		const invResult = await db.query(
			`SELECT id
               FROM invoices
               WHERE comp_code = $1`,
			[ req.params.code ]
		);

		if (compResult.rows.length === 0) {
			throw new ExpressError(`There is no company with code: ${req.params.code}`, 404);
		}

		const company = compResult.rows[0];
		const invoices = invResult.rows;

		company.invoices = invoices.map((inv) => inv.id);
		company.industries = compResult.rows.map((r) => r.name);

		return res.json({ company: company });
	} catch (err) {
		return next(err);
	}
});

// POST /companies
// Adds a company.
// Needs to be given JSON like: {code, name, description}
// Returns obj of new company: {company: {code, name, description}}
router.post('/', async (req, res, next) => {
	try {
		let { name, description } = req.body;
		let code = slugify(name, { lower: true });

		const result = await db.query(
			`INSERT INTO companies (code, name, description) 
                VALUES ($1, $2, $3) 
                RETURNING code, name, description`,
			[ code, name, description ]
		);
		return res.status(201).json({ company: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

// PUT /companies/[code]
// Edit existing company
// Should return 404 if company cannot be found.
// Needs to be given JSON like: {name, description}
// Returns update company object: {company: {code, name, description}}
router.put('/:code', async (req, res, next) => {
	try {
		if ('code' in req.body) {
			throw new ExpressError('Not allowed', 400);
		}

		const result = await db.query(
			`UPDATE companies
                SET  name = $1,
                description = $2
                WHERE code = $3
                RETURNING code, name, description`,
			[ req.body.name, req.body.description, req.params.code ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no company with code '${req.params.code}'`, 404);
		}

		return res.json({ company: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

// DELETE /companies/[code]
// Deletes company.
// Should return 404 if company cannot be found.
// Returns {status: "deleted"}

router.delete('/:code', async (req, res, next) => {
	try {
		const result = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`, [
			req.params.code,
		]);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is no company with code '${req.params.code}'`, 404);
		}

		return res.json({ status: 'deleted' });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
