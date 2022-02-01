const { Permissions } = require('discord.js');

module.exports = {
	name: 'sinvite',
	description: 'Provides a permanent invite for the curent server',
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: [Permissions.FLAGS.CREATE_INSTANT_INVITE, Permissions.FLAGS.MANAGE_MESSAGES],
    type: "TEXT",
	cooldown: 10000,
    async run(message, args, client) {    
		message.channel.createInvite({ maxAge: 0 }).then(invite => message.channel.send(invite.url));
	}
};