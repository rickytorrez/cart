import React from 'react';

/** Container wraps everything and centers it on the screen
 * Row and Col help with the grid
 */
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>Copyright &copy; ProShop</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
