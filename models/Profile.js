const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	phone: {
		type: Number,
		required: true,
	},
	ID_No: {
		type: String,
		required: true,
	},
	dateofbirth: {
		type: Date,
		required: true,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
