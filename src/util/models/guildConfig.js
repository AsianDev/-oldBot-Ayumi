const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    welcomeChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    suggestionChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    leaveChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    BoostChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    QuickwelcomeChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
});

module.exports = mongoose.model('guildConfig', configSchema);