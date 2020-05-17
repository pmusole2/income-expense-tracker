const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	madeat: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = Transaction = mongoose.model('transaction', TransactionSchema);
