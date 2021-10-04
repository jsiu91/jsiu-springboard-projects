/** Auth-related routes. */

const jsonschema = require('jsonschema');

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');
const userRegisterSchema = require('../schemas/userRegister.json');
const userLoginSchema = require('../schemas/userLogin.json');
const e = require('express');

/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userRegisterSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const { username, password, first_name, last_name, email, phone } = req.body;
		const user = await User.register({ username, password, first_name, last_name, email, phone });
		const token = createTokenForUser(username, user.admin);
		return res.status(201).json({ token });
	} catch (err) {
		return next(err);
	}
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userLoginSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const { username, password } = req.body;
		// BUG #5 Missing await when calling User.authenticate method.
		// Setting always admin value to undefined and default=false
		const user = await User.authenticate(username, password);
		const token = createTokenForUser(username, user.admin);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
}); // end

module.exports = router;
