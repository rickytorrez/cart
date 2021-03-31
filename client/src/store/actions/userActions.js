import axios from 'axios';
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
} from '../constants/userConstants';

/**
 * function that makes a request to login and gets the token
 * @param {*} email
 * @param {*} password
 */
export const login = (email, password) => async (dispatch) => {
	try {
		// dispatches the request to login
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		// content type for the request sent - headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		/**
		 * to make a post request
		 *  pass the route
		 *  pass the data as a second arg on an object
		 *  pass the config object for headers
		 */
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		/**
		 * when the request is completed
		 *  dispatch the type of action for USER_LOGIN_SUCCESS
		 *  for the payload, pass the data we get back from the request
		 */
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		/**
		 * set the user to local storage - user object
		 */
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
