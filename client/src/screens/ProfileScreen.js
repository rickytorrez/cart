import React, { useState, useEffect } from 'react';
/**
 * useDispatch and useSelector are needed when the component needs access to redux
 */
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../store/actions/userActions';

import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, Form, Button } from 'react-bootstrap';

const ProfileScreen = ({ history }) => {
	/**
	 * component level state for the form fields
	 */
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	/**
	 * helps check if userIsLogged in to show this page
	 * gets userLogin slice of data from the state with useSelector
	 */
	const userLogin = useSelector((state) => state.userLogin);

	/**
	 * gets the needed part from our state
	 */
	const { userInfo } = userLogin;

	/**
	 * gets userDetails slice of data from the state with useSelector
	 */
	const userDetails = useSelector((state) => state.userDetails);

	/**
	 * gets the needed part from our state
	 */
	const { loading, error, user } = userDetails;

	/**
	 * useEffect to make calls to the backend to get the user details
	 * re routes user if there's no login info
	 * dispatches getUserDetails if user.name is empty
	 * sets name and sets password
	 * pass user as a dependency to make sure the information gets filled when the request fires
	 */
	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			// DISPATCH UPDATE PROFILE
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm your password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2> My Orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
