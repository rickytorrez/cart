import mongoose from 'mongoose';
import brcypt from 'bcryptjs';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await brcypt.compare(enteredPassword, this.password);
};

/**
 * encrypt the password before registering/saving the user to the database
 */
userSchema.pre('save', async function (next) {
	// check to skip hashing the password is the user schema is updated
	if (!this.isModified('password')) {
		next();
	}
	const salt = await brcypt.genSalt(10);
	this.password = await brcypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
