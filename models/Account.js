const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
	total_expense: {
		type: Number,
		default: 0,
	},
	total_income: {
		type: Number,
		default: 0,
	},
});

module.exports = Account = mongoose.model('account', AccountSchema);
