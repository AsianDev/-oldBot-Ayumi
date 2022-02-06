const mongoose = require('mongoose')

const actionSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    BiteAmount: { type: Number, default: 1 },
    CuddleAmount: { type: Number, default: 1 },
    yeetAmount: { type: Number, default: 1 },
    tickleAmount: { type: Number, default: 1 },
    stompAmount: { type: Number, default: 1 },
    PunchAmount: { type: Number, default: 1 },
    HugAmount: { type: Number, default: 1 },
    BoopAmount: { type: Number, default: 1 },
    KillAmount: { type: Number, default: 1 },
    LickAmount: { type: Number, default: 1 },
    SlapAmount: { type: Number, default: 1 },
    PokeAmount: { type: Number, default: 1 },
    PatAmount: { type: Number, default: 1 },
    MadAmount: { type: Number, default: 1 },
    LaughAmount: { type: Number, default: 1 },
    KissAmount: { type: Number, default: 1 },
    DodgeAmount: { type: Number, default: 1 },
  })

module.exports = mongoose.model("AnimeCount", actionSchema);