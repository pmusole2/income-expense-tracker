const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route       GET api/profile/me
// @desc        Get Users Profile
// @access      private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'email']);

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST api/profile
// @desc        Create a user profile
// @access      private
router.post(
	'/',
	[
		auth,
		[
			check(
				'phone',
				'Phone Number is required. Please Enter a valid Phone number'
			)
				.not()
				.isEmpty(),
			check(
				'ID_No',
				'ID Number is required, Please enter a passport number or National Registration Card No.'
			)
				.not()
				.isEmpty(),
			check(
				'dateofbirth',
				'Date of Birth is required for account recovery purposes, Please Enter Your Date of Birth'
			)
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { phone, ID_No, dateofbirth } = req.body;

		const newProfile = {
			phone,
			ID_No,
			dateofbirth,
			user: req.user.id,
		};

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			// Check if User Profile Exists
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: newProfile },
					{ new: true }
				);
				return res.json(profile);
			}

			profile = new Profile(newProfile);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route       DELETE api/profile
// @desc        Delete Profile, User and Posts
// @access      private
router.delete('/', auth, async (req, res) => {
	try {
		// @Todo Remove Users Posts

		// Remove Profile
		await Profile.findOneAndDelete({ user: req.user.id });

		// Remove the user
		await User.findOneAndDelete({ _id: req.user.id });

		res.json({ msg: 'User Deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
