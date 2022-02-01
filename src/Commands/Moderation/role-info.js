const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Command = require('../../Handlers/Command.js')

module.exports = new Command ({
	name: 'roleinfo',
	description: 'Displays information about a provided role.',
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["ADMINISTRATOR"],
	aliases: ['role-info', 'ri'],
	cooldown: 5000,
	async run(message, args, client) {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.channel.send(
				'*Waa~* Please provide a role that is in this server!',
			);
		}

        const permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone"
        }
        const mentionPermissions = role.permissions.toArray() === null ? "None" : role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setFooter({ text: `Requested by ${message.author.tag}`})
			.setTimestamp()
			.setTitle('Role Information')
			.addFields(
				{ name: 'Role Name', value: `\`\`\`${role.name}\`\`\``, inline:true },
				{ name: 'Role ID', value: `\`\`\`${role.id}\`\`\``, inline:true },
				{ name: 'Hex Color', value: `\`\`\`${role.hexColor.toUpperCase()}\`\`\`` },
				{ name: 'Members', value: `\`\`\`${role.members.size}\`\`\``, inline:true },
				{ name: 'Display Role Separately', value: `\`\`\`${role.hoist ? 'Yes' : 'No'}\`\`\``, inline:true },
				{ name: 'Mentionable', value: `\`\`\`${role.mentionable ? 'Yes' : 'No'}\`\`\``, inline:true },
				{ name: 'Created date', value: `\`\`\`${moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - role.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
			)
      .addField('Key Permissions', 
				`\`\`\`${finalPermissions.join(', ')}\`\`\``,
			);
			

		return message.channel.send({embeds: [embed]});
	},
});