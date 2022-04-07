const mongoose = require("mongoose")

let EconomySchema  = new mongoose.Schema({
    userID: { type: String, default: null },
    MyID: { type: String, default: null },
    wallet: { type: Number },
    bank: { type: Number, default: 200 },
    bankSpace: { type: Number, default: 10000 },
    dailyAt: { type: Number, default: 0, required: true },
    dailyStreak: { type: Number, default: 0, required: true },
    inventory: { type: Object },   
    isPassive: { type: Boolean, default: false } 
})


module.exports = mongoose.model("EconomyDataBase", EconomySchema)