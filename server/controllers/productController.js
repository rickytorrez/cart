// asyncHandler is a middleware for exception handling
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

/**
 * @description Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
	// the empty object param on the find method returns all the products
	const products = await Product.find({});
	res.json(products);
});

/**
 * @description Fetch a single product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getProducts, getProductById };
