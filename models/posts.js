const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	Title: {
		type: String,
		trim: true,		
		required: true,
	},
	Description: {
		type: String,
		trim: true,		
		required: true,
	},
	Author: {
		type: String,
		trim: true,		
		required: true,
	},
	Datetime: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('Post', PostSchema)