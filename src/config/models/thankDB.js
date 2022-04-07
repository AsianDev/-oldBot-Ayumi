const mongoose = require('mongoose')

const thankDB = new mongoose.Schema({
    GuildID: { type: String, require: true, unique: true },
    UserID: { type: String, require: true, unique: true },
    ThanksCount: { type: Number, default: 0 },
    Reason: { type: String, require: true }
})

module.exports = mongoose.model("thankDataBase", thankDB);