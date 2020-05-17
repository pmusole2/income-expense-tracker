const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Account = require('../models/Account');

// @route       GET api/account
// @desc        Get Account Details
// @access      private
router.get('/', auth, async (req, res) => {
	try {
		const account = await Account.findOne({
			user: req.user.id,
		}).populate('user', ['name']);
		res.json(account);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route       post api/account
// @desc        Create Account
// @access      private
router.post('/', auth, async (req, res) => {
	let account = await Account.findOne({ user: req.user.id });
	let { amount, type } = req.body;
	// Check if an an amount and type is being passed
	if (!amount && !type) {
		account = 0;
		type = 0;
		const newTrans = {
			balance: 0,
			total_expense: 0,
			total_income: 0,
			user: req.user.id,
		};
		try {
			// Check if the Account exists, If So Update
			if (account) {
				account = await Account.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: newTrans },
					{ new: true }
				);
				return res.json(account);
			}

			// In this case an account doesn't exist so one will be made
			account = new Account(newTrans);

			await account.save();

			res.json(account);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	} else {
		// This part runs on the condition that an amount and type have been passed
		if (type.toLowerCase() === 'income') {
			try {
				// Check if an account exists, if so do an update
				if (account) {
					let oldTotalIncome = account.total_income;
					let oldBalance = account.balance;
					let newTotalIncome = Number(oldTotalIncome) + Number(amount);
					let newBalance = Number(oldBalance) + Number(amount);
					const newTrans = {
						balance: newBalance,
						total_income: newTotalIncome,
						user: req.user.id,
					};
					account = await Account.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: newTrans },
						{ new: true }
					);
					return res.json(account);
				}
				const newTrans = {
					balance: amount,
					total_income: amount,
					user: req.user.id,
				};
				account = new Account(newTrans);

				await account.save();

				res.json(account);
			} catch (err) {
				console.error(err.message);
				res.status(500).send('Server Error');
			}
		} else if (type.toLowerCase() === 'expense') {
			try {
				// Check if an account exists, if so do an update
				if (account) {
					let oldTotalExpense = account.total_expense;
					let oldBalance = account.balance;
					if (oldBalance - amount < 0) {
						return res.status(400).json({
							msg: 'You do not have enough Balance for this transaction',
						});
					}
					let newTotalExpense = Number(oldTotalExpense) + Number(amount);
					let newBalance = Number(oldBalance) - Number(amount);
					const newTrans = {
						balance: newBalance,
						total_expense: newTotalExpense,
						user: req.user.id,
					};
					account = await Account.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: newTrans },
						{ new: true }
					);
					return res.json(account);
				}
				const newTrans = {
					balance: amount,
					total_expense: amount,
					user: req.user.id,
				};
				account = new Account(newTrans);

				await account.save();

				res.json(account);
			} catch (err) {
				console.error(err.message);
				res.status(500).send('Server Error');
			}
		}
	}
});

module.exports = router;
