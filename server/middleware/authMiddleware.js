/**
 * middleware to validate the token and use it to access a protected route
 */

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const protect = asyncHandler(async (req, res, next) => {
	let token;

	/**
	 * conditionally check to see if there's an authorization token in the request headers
	 * check for the word Bearer on the request
	 */
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		/**
		 * if true, split the authorization and take the second index, the token
		 */
		try {
			token = req.headers.authorization.split(' ')[1];
			/**
			 * decode the token by verifying it being compared to the process.env.JWT_SECRET
			 */
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			/**
			 * find the user by the decoded.id
			 */
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (err) {
			console.error(err);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { protect };
