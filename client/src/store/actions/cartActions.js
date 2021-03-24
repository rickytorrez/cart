import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

/**
 * addToCart is an action that will route to the server
 * @param {*} id takes id from the browser url
 * @param {*} quantity takes quantity from the browser url
 * getState enables us to get our entire state tree
 */
export const addToCart = (id, quantity) => async (dispatch, getState) => {
	/**
	 * makes an API request to get the information of particular product
	 */
	const { data } = await axios.get(`/api/products/${id}`);

	/**
	 * dispatches an action
	 * type: CART_ADD_ITEM
	 * payload: served as an object set from the data from the API call
	 * quantity is set by what is passed on the browser URL
	 */
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			quantity,
		},
	});

	/**
	 * cartItems is saved to localStorage
	 * Turn the JS object into a JSON string
	 * use getState to get the cartItems inside the cart piece of reducer
	 */
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
