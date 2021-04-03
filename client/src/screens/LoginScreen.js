import React, { useState, useEffect } from 'react';
import { useDispath, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../store/actions/userActions';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginScreen = ({ location }) => {
	/**
	 * component level state for the form fields
	 */
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/**
	 * checks for url query string
	 * if it exists, we'll split it and use it or just use slash
	 * gives the option to add a redirect
	 */
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const submitHandler = (e) => {
		e.preventDefault();
		// @TODO - Dispatch Login
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
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
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/redirect?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
