const express = require('express');
const ExpressError = require('./expressError');
const { findMean, findMedian, findMode } = require('./operations');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/' (req, res) => {});

app.get('/mean', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('You must pass a query key of nums', 500);
		}
		let nums = req.query.nums.split(',');
		let mean = findMean(nums);

		let response = {
			operation: 'mean',
			value: `${mean}`,
		};

		return res.send(response);
	} catch (e) {
		return next(e);
	}
});

app.get('/median', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('You must pass a query key of nums', 500);
		}
		let nums = req.query.nums.split(',');
		let median = findMedian(nums);

		let response = {
			operation: 'median',
			value: `${median}`,
		};

		return res.send(response);
	} catch (e) {
		return next(e);
	}
});

app.get('/mode', (req, res, next) => {
	try {
		if (!req.query.nums) {
			throw new ExpressError('You must pass a query key of nums', 500);
		}
		let nums = req.query.nums.split(',');
		let mode = findMode(nums);

		let response = {
			operation: 'mode',
			value: `${mode}`,
		};

		return res.send(response);
	} catch (e) {
		return next(e);
	}
});

app.listen(3000, function () {
	console.log('App listening on port 3000');
});
