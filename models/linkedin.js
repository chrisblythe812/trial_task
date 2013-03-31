var mongoose = require('mongoose')
	, Schema = mongoose.Schema;
	
var LinkedinSchema = new Schema({
			name		: String
		, title		: String
		, date		: {type: Date, default: Date.now }
});

module.exports = mongoose.model('LinkEdin', LinkedinSchema)

