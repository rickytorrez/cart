import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/actions/cartActions';

import CheckoutSteps from './CheckoutSteps';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';

const ShippingScreen = ({ history }) => {
	/**
	 * cart state slice and shippingAddress grabbed from it
	 */
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	/**
	 * initial state for controlled component
	 */
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(
		shippingAddress.postalCode || ''
	);
	const [country, setCountry] = useState(shippingAddress.country || '');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your address'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your city'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your postal code'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your country'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
