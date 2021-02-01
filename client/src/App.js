import React from 'react';

/** Container wraps everything and centers it on the screen */
import { Container } from 'react-bootstrap';

import HomeScreen from './screens/HomeScreen';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
	return (
		<>
			<Header />
			{/* py-3 refers to padding on the Y axis */}
			<main className='py-3 '>
				<Container>
					<HomeScreen />
				</Container>
			</main>
			<Footer />
		</>
	);
};

export default App;
