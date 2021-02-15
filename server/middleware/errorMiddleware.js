const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// error handling middleware, takes err as a first param since we're overwriting it
const errorHandler = (err, req, res, next) => {
	// if error's status code is 200, make it equals to 500, when inside a route, we want to be able to set a status code before throwing an error
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	// response, show stack only on dev mode
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

export { notFound, errorHandler };
