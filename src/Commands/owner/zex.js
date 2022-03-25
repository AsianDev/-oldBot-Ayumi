const Command = require('../../Handlers/Command.js')
module.exports = new Command({
    name: 'testing',
    aliases: ["zex"],
    description: "zex cmd",
    userPermissions: "",
  botPermissions: "SEND_MESSAGES",
 cooldown: 4000,
    owner: true,
    async run(message, args, client) {
        message.channel.send(" ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n  ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ** **\n ");
    }
})
