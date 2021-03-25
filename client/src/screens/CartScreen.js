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

	console.log(cartItems);

	/**
	 * the app will only dispatch the action if there's a product id
	 * dispatch conditionally the addToCart action and pass the productId and quantity
	 */
	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	return <div>Cart</div>;
};

export default CartScreen;
