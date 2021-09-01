const express = require('express');
const app = express();
const itemRoutes = require('./itemRoutes');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', itemRoutes);

// 404 handler
app.use((req, res) => {
	return new ExpressError('Not Found', 404);
});

// generic error handler
app.use((err, req, res, next) => {
	let status = err.status || 500;

	return res.status(status).json({
		error: {
			message: err.message,
			status: status,
		},
	});
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});

module.exports = app;
