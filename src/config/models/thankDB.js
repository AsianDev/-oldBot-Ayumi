const mongoose = require('mongoose')

const thankDB = new mongoose.Schema({
    guildId: { type: String, require: true, unique: true },
    userId: { type: String, require: true, unique: true },
    ThanksCount: { type: Number, default: 0 },
    Reason: { type: String, require: true },
    lastGave: Date,

})

module.exports = mongoose.model("Thanks", thankDB);
