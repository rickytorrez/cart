import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

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
		default:
			return state;
	}
};
