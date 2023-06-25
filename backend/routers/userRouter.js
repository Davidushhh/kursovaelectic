const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
	const userEmail = await User.findOne({ email: req.body.email });
	const userName = await User.findOne({ username: req.body.username });

	if (userEmail || userName) {
		res.status(400).json({ error: 'User already exists' });
	} else {
		const user = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		});

		await user.save();

		res.status(201).json(user);
	}
});

userRouter.post('/login', async (req, res) => {
	const password = req.body.password;
	const user = await User.findOne({ email: req.body.email });

	if (user && (await bcrypt.compareSync(password, user.password))) {
		res.cookie('userId', user._id, { maxAge: 24 * 60 * 60 * 1000 },);
		return res.status(200).json({ message: 'Logined successfully' });
	}

	return res.status(400).json({ error: 'Email or password is incorrect' });
});

module.exports.userRouter = userRouter;