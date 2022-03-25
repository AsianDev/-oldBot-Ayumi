   const { model, Schema } = require("mongoose");

	let schema = new Schema({
		GuildID: String,
		WelcomeRole: String
	})
	module.exports = model('roleDB', schema)