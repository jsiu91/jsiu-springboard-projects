const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');
const { get } = require('superagent');

let router = new express.Router();

// GET /industries
// Listing all industries
router.get('/', async (req, res, next) => {
	try {
		const result = await db.query(`SELECT * FROM industries`);
		return res.json({ industry: result.rows });
	} catch (e) {
		return next(e);
	}
});

// POST /industries
// Adding a single industry
router.post('/', async (req, res, next) => {
	try {
		const result = await db.query(
			`INSERT INTO industries(code, name)
                VALUES ($1, $2)
                RETURNING code, name`,
			[ req.body.code, req.body.name ]
		);
		return res.status(201).json({ industry: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

// POST /industries/:code
// Adding industry to company
router.post('/:code', async (req, res, next) => {
	try {
		const result = await db.query(
			`INSERT INTO companies_industries(comp_code, ind_code)
                VALUES ($1, $2)
                RETURNING comp_code, ind_code`,
			[ req.params.code, req.body.ind_code ]
		);

		if (result.rows.length === 0) {
			throw new ExpressError(`There is not company with code ${req.params.code}`, 404);
		}

		return res.status(201).json({ industry: result.rows[0] });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
