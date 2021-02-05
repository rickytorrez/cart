import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdming: true,
	},
	{
		name: 'Sofia Torrez',
		email: 'sofy@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Lucas Torrez',
		email: 'lucas@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
