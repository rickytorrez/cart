import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/** Container wraps everything and centers it on the screen */
import { Container } from 'react-bootstrap';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<Router>
			<Header />
			{/* py-3 refers to padding on the Y axis */}
			<main className='py-3 '>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/payment' component={PaymentScreen} />
					{/* :id is a placeholder for the product._id */}
					<Route path='/product/:id' component={ProductScreen} />
					{/* :id? makes the id parameter optional */}
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
