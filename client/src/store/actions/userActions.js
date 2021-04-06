import axios from 'axios';
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
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

/**
 * function that logs user out
 * removes userInfo from localStorage
 */
export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({
		type: USER_LOGOUT,
	});
};

/**
 * function that makes a server call for user registration
 * @param {*} name
 * @param {*} email
 * @param {*} password
 */
export const register = (name, email, password) => async (dispatch) => {
	try {
		// dispatches the request to register
		dispatch({
			type: USER_REGISTER_REQUEST,
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
			'/api/users',
			{ name, email, password },
			config
		);

		/**
		 * when the request is completed
		 *  dispatch the type of action for USER_REGISTER_SUCCESS
		 *  payload is dealth with on USER_LOGIN_SUCCESS
		 */
		dispatch({
			type: USER_REGISTER_SUCCESS,
		});

		/**
		 * after user has registered, the application should automatically log the user in
		 * the payload is dealth with here avoiding data leaks around the application
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
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
