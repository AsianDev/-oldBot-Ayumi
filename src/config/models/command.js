const mongoose = require("mongoose")

let schema  = new mongoose.Schema({
    Guild: String,
    Cmds: Array,
})

module.exports = mongoose.model('cmds', schema)