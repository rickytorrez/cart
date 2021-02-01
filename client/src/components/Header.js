import React from 'react';

/** Container wraps everything and centers it on the screen */
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand href='/'>ProShop</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<Nav.Link href='/cart'>
								{/* font awesome i tags were imported through the cdn */}
								<i className='fas fa-shopping-cart' /> Cart
							</Nav.Link>
							<Nav.Link href='/login'>
								<i className='fas fa-user' /> Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
