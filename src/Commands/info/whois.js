const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const Command = require('../../Handlers/Command.js')
const moment = require('moment');
const { paginate } = require("../../config/functions/buttonPagination.js")

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
        const mention = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.member;
        const nick = mention.nickname === null ? "None" : mention.nickname;
        const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
        const usericon = mention.user.avatarURL;
        const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
        const finalPermissions = [] 
        for (const permission in permissions) {
            if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
            else;
        }

        var flags = {
            "": "None",
            DISCORD_EMPLOYEE: '<:discordstaff:781996726810574870>',
            DISCORD_PARTNER: '<:discordpartner:814491300068851725>',
            BUGHUNTER_LEVEL_1: '<:bughunter1:814491292369289276>',
            BUGHUNTER_LEVEL_2: '<:bughunter2:814491290145259560>',
            HYPESQUAD_EVENTS: '<:discordhypesquad:929651430820810792>',
            HOUSE_BRAVERY: '<:discordbravery:814491294696341524>',
            HOUSE_BRILLIANCE: '<:discordbrillance:814491312124330004>',
            HOUSE_BALANCE: '<:discordbalance:944442479262982207>',
            EARLY_SUPPORTER: '<:discordearlysupporter:879034495536340993>',
            VERIFIED_BOT: '<:bottag:814491295799050301>',
            VERIFIED_DEVELOPER: '<:developer_badge1:809416687207710760>',
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
        .addField(`Overview`, `**Badges**: ${flags[mention.user.flags.toArray().join(", ")]}\nHuman or bot: \`${bot[mention.user.bot]}\``)
        .addField(`Misc Info`, `**Acc Created on**: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nJoined This Server on: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
        .setThumbnail(mention.user.avatarURL())
        .setTimestamp()
        .setColor(colour.pink)

        const embed2roles = new Discord.MessageEmbed()
        .setTitle(`${mention.user.username} user information`, mention.user.avatarURL())
        .addField(`Roles and Permissions`, `Roles: <@&${mention._roles.join(">  <@&")}>`)
        .addField("Key Permissions:",  `\`\`${finalPermissions.join(', ')}\`\``)
        .setURL("https://discord.gg/TQ3mTPE7Pf")
        .setThumbnail(usericon)
        .setThumbnail(mention.user.avatarURL())
        .setColor(colour.pink)

        let pages =[embed, embed2roles]

        paginate(message, pages) 

    }
})