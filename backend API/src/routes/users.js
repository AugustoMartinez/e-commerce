const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const userList = await User.find().select('-password');

		res.status(200).json(userList);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');

		if (!user) {
			return res.status(404).json({ message: 'Cannot find user' });
		}

		res.status(200).json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get(`/get/count`, async (req, res) => {
	try {
		const userCount = await User.countDocuments();

		res.status(200).json({ userCount: userCount });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post('/register', async (req, res) => {
	let user = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		isAdmin: req.body.isAdmin,
	});

	try {
		user = await user.save();

		res.status(201).json(user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		const secret = process.env.SECRET;

		if (!user) {
			return res.status(404).json('Cannot find user');
		}

		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			const token = jwt.sign(
				{
					userId: user.id,
					isAdmin: user.isAdmin,
				},
				secret,
				{ expiresIn: '1d' }
			);

			res.status(200).send({ user: user.email, token: token });
		} else {
			res.status(400).send('password or user is wrong!');
		}
	} catch (e) {
		res.status(500).json({ success: false, error: err });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const userExist = await User.findById(req.params.id);

		if (!userExist) {
			return res.status(404).json({ success: false, message: 'Cannot find user' });
		}

		let newPassword;

		if (req.body.password) {
			newPassword = bcrypt.hashSync(req.body.password, 8);
		} else {
			newPassword = userExist.password;
		}

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				email: req.body.email,
				password: newPassword,
				phone: req.body.phone,
				isAdmin: req.body.isAdmin,
				street: req.body.street,
				apartment: req.body.apartment,
				zip: req.body.zip,
				city: req.body.city,
				country: req.body.country,
			},
			{ new: true }
		);

		if (!user) {
			return res.status(404).send('the user cannot be updated!');
		}

		res.status(200).json(user);
	} catch (e) {
		res.status(500).json({ success: false, error: e });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(404).json({ success: false, message: 'Cannot find user' });
		}

		res.status(200).json({ success: true, message: 'Deleted user' });
	} catch (e) {
		res.status(500).json({ success: false, error: err });
	}
});

module.exports = router;
