const mongoose = require('mongoose');

const LockDown = new mongoose.Schema({
    GuildId: {
        type: String,
        required: true,
    },
    EnabledOrDisabled: {
        type: String, 
        required: true
    },
    Reason: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LockDownDB', LockDown);