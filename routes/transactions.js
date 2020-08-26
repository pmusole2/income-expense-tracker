const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Transaction = require('../models/Transactions');
const { tokenL } = require('../routes/auth');


// const updateAccount = async (amount, type) => {
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'x-auth-token': token,
// 		},
// 	};

// 	const body = JSON.stringify({ amount, type });
// 	try {
// 		const res = await axios.post(
// 			'http://localhost:5001/api/account',
// 			body,
// 			config
// 		);
// 		return res.data;
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// };

// @route       GET api/transactions
// @desc        Get Users Transactions
// @access      private
router.get('/', auth, async (req, res) => {
	try {
		const transactions = await Transaction.find({ user: req.user.id }).sort({
			date: 1,
		});

		res.json(transactions);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       POST api/transactions
// @desc        Make a transaction
// @access      private
router.post(
	'/',
	[
		auth,
		[
			check('description', 'Description of Transaction is required')
				.not()
				.isEmpty(),
			check('type', 'Type of Transaction is required').not().isEmpty(),
			check('amount', 'Transaction amount is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { description, type, amount } = req.body;

		try {
			const newTransaction = new Transaction({
				user: req.user.id,
				description,
				type,
				amount,
			});

			const transaction = await newTransaction.save();
			// updateAccount(amount, type);

			res.json(transaction);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
