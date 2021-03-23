import React from 'react';
import { Alert } from 'react-bootstrap';

/**
 *
 * @param {variant} param0
 * @param {children} children message we want to display
 */
const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

/**
 * default value for the variant - info is a blue color
 */
Message.defaultProps = {
	variant: 'info',
};

export default Message;
