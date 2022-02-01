const Command = require('../../Handlers/Command.js')
module.exports = new Command({
    name: 'recording',
    description: '',
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    async run(message, args, client) {
        message.channel.send(" ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ");
    }
})
