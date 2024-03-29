const { Permissions } = require('discord.js');
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
	name: 'invite',
	description: 'Provides a permanent invite for the curent server',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: [Permissions.FLAGS.CREATE_INSTANT_INVITE, Permissions.FLAGS.MANAGE_MESSAGES],
	type: "Text",
	cooldown: 10000,
    async run(message, args, client) {    
		message.channel.createInvite({ maxAge: 0 }).then(invite => message.channel.send(invite.url));
	}
})