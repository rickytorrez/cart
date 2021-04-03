import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/userActions';

import { LinkContainer } from 'react-router-bootstrap';

/** Container wraps everything and centers it on the screen */
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
	const dispatch = useDispatch();

	/**
	 * extract userLogin slice of state to conditionally show on navbar
	 */
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									{/* font awesome i tags were imported through the cdn */}
									<i className='fas fa-shopping-cart' /> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									{/* No link container since we have an event handler on the link itself */}
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user' /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
