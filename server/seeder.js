import dotenv from 'dotenv';
import users from './fixtures/users.js';
import products from './fixtures/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		// clear all three collections out completely
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// import the user fixtures
		// array of created users
		const createdUsers = await User.insertMany(users);

		// get the admin id
		const adminUser = createdUsers[0]._id;

		// map through the fixture products and add the admin id to each product as the user field
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		// import the product fixtures
		await Product.insertMany(sampleProducts);

		console.log('Data Imported'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(`${err}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// clear all three collections out completely
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
