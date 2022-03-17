   const { model, Schema } = require("mongoose");

module.exports = model(
	"roleDB",
	new Schema({
		GuildID: String,
		WelcomeID: { type: String, default: null },
	})
);