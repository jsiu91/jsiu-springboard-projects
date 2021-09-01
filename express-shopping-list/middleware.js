function logger (req, res, next) {
	console.log(`Sending ${req.method} request to ${req.path}`);
	return next();
}
