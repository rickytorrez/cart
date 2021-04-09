import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

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

/**
 * remove from cart is an action that will remove an item from the user cart
 * @param {string} id product id to be removed
 * dispatch to dispatch to reducer
 * getState to get all the items in the cart to allow the reset of local storage to whatever is in the cart minus the removed item(s)
 */
export const removeFromCart = (id) => (dispatch, getState) => {
	/**
	 * dispatches an action
	 * type: CART_REMOVE_ITEM
	 * payload: object id that is removed
	 */
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	/**
	 * saves the new cartItems in JSON format into local storage
	 */
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

/**
 * saves shipping address for customer
 * @param {*} data takes in the form data as a parameter
 */
export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	/**
	 * saves the address in JSON format into local storage
	 */
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};
