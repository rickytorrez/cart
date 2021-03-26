import React, { useEffect } from 'react';
/**
 * useDispatch and useSelector are needed when the component needs access to redux
 */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/actions/cartActions';

import Message from '../components/Message';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import './CartScreen.css';

/**
 *
 * @param {*} match used to get the productId
 * @param {*} location  used to get the query string - quantity
 * @param {*} history  used to redirect
 */
const CartScreen = ({ match, location, history }) => {
	/**
	 * get product id, will be passed on the URL link
	 * productId will not always be present since the user can access the cart page anytime
	 */
	const productId = match.params.id;

	/**
	 * location.search returns the query string ?quantity=x
	 * to extract the quantity number if it exists, split the array by creating two indexes that are divided by the = sign => [?qty, 1]
	 * get the first index => x
	 * else, the quantity will be 1
	 */
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	/**
	 * grabbing the piece of state to add items to cart
	 * destructures from cartItems from cart
	 */
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	/**
	 * the app will only dispatch the action if there's a product id
	 * dispatch conditionally the addToCart action and pass the productId and quantity
	 */
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	/**
	 * remove handler to delete items from cart
	 * @param {string} id product id
	 */
	const removeFromCartHandler = (id) => {
		console.log('removed ' + id);
	};

	/**
	 * check out handler takes us to either login or shipping depending on auth
	 */
	const checkoutHandler = () => {
		console.log('checkout');
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back </Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{/* maps through cartItems for each item. product is the _id of the item as stated on the cartAction.js file */}
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										{/* Form Control provides a select drop down where quantity is passed as an initial value
                            Takes an onChangeProp to set the quantity on local state
                        */}
										<Form.Control
											className='indent'
											as='select'
											value={item.quantity}
											// unlike ProductScreen, we take the id from the item, the quantity from the event and update the cart with these values
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{/* Quantity options spread out the array, it takes the countInStocks' keys => [0,1,2,3,4] IE: countInStock is 5
                              maps for x and displays an option tag with a key which is x + 1 => array starts with 0 so the +1 makes it start at 1
                              value will also be x + 1
                          */}
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										{/* remove button */}
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								{/* use reduce (high order array method), it takes an accumulator and the current item
                      adds the accumulator the current item's quantity
                      the second argument is where we want the accumulator to start => 0 */}
								Subtotal (
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)}) Items
							</h2>
							$
							{/* use reduce again to take the accumulator and add it to the value of the quantity times the price
                  the accumulator starts at 0
                  use toFixed to make it a two decimal value */}
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
