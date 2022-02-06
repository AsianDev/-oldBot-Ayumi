const mongoose = require('mongoose')

const welcomerole = new mongoose.Schema({
    Guild: String,
    Role: String
})

module.exports = mongoose.model("welcomerole", welcomerole);