import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../store/actions/productActions';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	Form,
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = ({ history, match }) => {
	const [quantity, setQuantity] = useState(1);

	const dispatch = useDispatch();

	/**
	 * for consistency, match the name of the slice of state to what was originally passed as a reducer on the store.js file
	 */
	const productDetails = useSelector((state) => state.productDetails);

	/**
	 * destructure from the slice of productDetails state
	 */
	const { error, loading, product } = productDetails;

	/**
	 * fetches the product on load
	 * pass the id by using match.params.id
	 */
	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match]);

	/**
	 * addToCartHandler
	 * routes us to the cart page (history help) and takes parameters of
	 * match.params.id => product id
	 * quantity => being passed with a query string
	 */
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?quantity=${quantity}`);
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						{/* fluid keeps the image inside its container */}
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantiy:</Col>
											<Col className='select-form'>
												{/* Form Control provides a select drop down where quantity is passed as an initial value
                            Takes an onChangeProp to set the quantity on local state
                        */}
												<Form.Control
													as='select'
													value={quantity}
													onChange={(e) => setQuantity(e.target.value)}
												>
													{/* Quantity options spread out the array, it takes the countInStocks' keys => [0,1,2,3,4] IE: countInStock is 5
                              maps for x and displays an option tag with a key which is x + 1 => array starts with 0 so the +1 makes it start at 1
                              value will also be x + 1
                          */}
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn btn-block'
										type='button'
										disabled={product.countInStock === 0}
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
