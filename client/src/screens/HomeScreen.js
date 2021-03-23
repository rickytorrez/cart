import React, { useEffect } from 'react';

/**
 * useDispatch is used to dispatch an action
 * useSelector is used to get a slice of the state that we need in a component -> productList
 */
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../store/actions/productActions';

import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
	const dispatch = useDispatch();

	/**
	 * usSelector takes in an arrow function
	 * 	state
	 * 	function that chooses what part of the state we want
	 */
	const productList = useSelector((state) => state.productList);

	/**
	 * destructure the parts of the state that we need
	 * from productListReducer at productReducers.js
	 */
	const { loading, error, products } = productList;

	/**
	 * fetches the products on load through listProducts
	 * pass dispatch as a dependency
	 */
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<h2>Loading...</h2>
			) : error ? (
				<h3>{error}</h3>
			) : (
				<Row>
					{products.map((product) => (
						// sm, md, lg and xl refer to how much space each column will take on different screen sizes
						<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
