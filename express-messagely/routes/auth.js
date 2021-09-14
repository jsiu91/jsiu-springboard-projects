const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../expressError');

const router = new express.Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const auth = await User.authenticate(username, password);

		if (auth) {
			User.updateLoginTimestamp(username);
			let token = jwt.sign({ username }, SECRET_KEY);
			return res.json({ token });
		}
		throw new ExpressError('Invalid username/password', 400);
	} catch (e) {
		return next(e);
	}
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/', async (req, res, next) => {
	try {
		const { username, password, first_name, last_name, phone } = req.body;
		await User.register(username, password, first_name, last_name, phone);
		let token = jwt.sign({ username }, SECRET_KEY);
		User.updateLoginTimestamp(username);
		return res.json({ token });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
