const { model, Schema } = require("mongoose");

module.exports = model(
	"logsDB",
	new Schema({
		GuildID: { type: String, default: null },
		Logs: { type: String, default: null },
	})
);