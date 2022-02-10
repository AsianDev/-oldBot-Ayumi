const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')
const moment = require('moment');

module.exports = new Command({
    name: "whois",
    description: "Display's the Information on a user",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 3000,
    aliases: ["userinfo", "ui", "useri"],
    type: "TEXT",
    async run(message, args, client) {
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
        const mention = message.mentions.members.first() || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [] || "**No key permissions**";
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }
        var flags = {
            "": "None",
            "DISCORD_EMPLOYEE": "Discord Employee",
            "DISCORD_PARTNER": "Discord Partner",
            "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
            "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
            "HYPESQUAD_EVENTS": "Hypesquad Events",
            "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
            "HOUSE_BRAVERY": "HypeSquad Bravery",
            "HOUSE_BALANCE": "HypeSquad Balance",
            "EARLY_SUPPORTER": "Early Supporter",
            "TEAM_USER": "Team User",
            "VERIFIED_BOT": "Verified Bot",
            "EARLY_VERIFIED_DEVELOPER": "Early Verified Bot Developer"
        };
        var bot = {
            "true": "Npc",
            "false": "Otaku <3"
        };
        const embed = new Discord.MessageEmbed()
        .setTitle(`${mention.user.username} user information`, mention.user.avatarURL())
        .setURL("https://discord.gg/TQ3mTPE7Pf")
        .setThumbnail(usericon)
        .addField(`General Info`, `**Name**: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nNickname: \`${nick}\``)
        .addField(`Overview`, `**Badges**: \`${flags[mention.user.flags.toArray().join(", ")]}\`\n**Human or bot**: \`${bot[mention.user.bot]}\``)
        .addField(`Server Relating Info`, `**Roles**: <@&${mention._roles.join(">  <@&")}> \n**Key Permissions**: \n \`\`${finalPermissions.join(', ')}\`\``)
        .addField(`Misc Info`, `**Acc Created on**: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \n**Joined This Server on**: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setFooter({text: `ID: ${mention.user.id}`, iconURL:  mention.user.avatarURL()})
        .setTimestamp()
        .setColor("RANDOM");
        message.channel.send({embeds: [embed]})
    }
})