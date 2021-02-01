import React from 'react';

import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import products from '../fixtures/products';

const HomeScreen = () => {
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					// sm, md, lg and xl refer to how much space each column will take on different screen sizes
					<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
