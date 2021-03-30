import jwt from 'jsonwebtoken';

/**
 * @id takes an id since that is what we want to add as a payload to this token
 * take three arguments
 *  - id which is returned on payload
 *  - the secret word which is saved in the .env file
 *  - an object that contains the expiration time for the token
 */
const generateToken = (id) => {
	return jwt.sign(
		{
			id,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d',
		}
	);
};

export default generateToken;
