import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
} from '../constants/userConstants';

/**
 * handles the state for the user login
 * @param {*} state initially an empty object
 * @param {*} action switches on case type
 */
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

/**
 * handles the state for user registration
 * userInfo is no longer passed as a payload here since USER_LOGIN_SUCCESS is dealing with the userInfo data flow
 * @param {*} state initially an empty object
 * @param {*} action  switches on case type
 */
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

/**
 * handles the state for user details information
 * @param {*} state empty user object as the initial state
 * @param {*} action switches on case type
 */
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			// spreads state in case there's data in our state
			return { ...state, loading: true };
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
