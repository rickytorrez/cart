import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

/**
 * cartReducer takes inital state, cartItems array for different and multiple items
 * action to be dispatched
 */
export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			/**
			 * puts payload on item
			 */
			const item = action.payload;

			/**
			 * looks to see if the cartItem exists in the cartItems array
			 * cartItem.product is the id
			 */
			const existItem = state.cartItems.find(
				(cartItem) => cartItem.product === item.product
			);

			/**
			 * if existItem is true
			 */
			if (existItem) {
				return {
					/**
					 * if exists
					 * return the state by spreading it
					 * for cartItems, map through the cartItems
					 * if the current iteration of the cartItem.product (id) is equat to the existItem.product (id in the cartItems ), then just return the item for that iteration
					 * else return cartItem
					 */
					...state,
					cartItems: state.cartItems.map((cartItem) =>
						cartItem.product === existItem.product ? item : cartItem
					),
				};
			} else {
				/**
				 * if it doesnt exist, we'll push it to the cartItems array
				 * return the spread state
				 * return the cartItems, spread its contents and add the new item
				 */
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				/**
				 * returns the spread state
				 */
				...state,
				/**
				 * returns the cartItems where it filters out the one we're removing by comparing the item.product (id) that is not equal to the action.payload
				 * essentially stripping out whatver id that we remove
				 */
				cartItems: state.cartItems.filter(
					(item) => item.product !== action.payload
				),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				// spreads the state
				...state,
				// receives the data that we pass from the form as the action payload
				shippingAddress: action.payload,
			};
		default:
			return state;
	}
};
