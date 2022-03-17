
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js');
const { paginate } = require("../../Systems/PaginationSys.js")

const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Extreme'
};

const featuresList = {
    ANIMATED_ICON: "Animated Icon",
    BANNER: "Banner Image",
    COMMERCE: "Commerce",
    COMMUNITY: "Community",
    DISCOVERABLE: "Server Discovery",
    FEATURABLE: "Featurable",
    INVITE_SPLASH: "Splash Invite",
    MEMBER_VERIFICATION_GATE_ENABLED: "Membership Screening enabled",
    NEWS: "News Channels",
    PARTNERED: "Partnered",
    PREVIEW_ENABLED: "Preview enabled",
    VANITY_URL: "Vanity URL",
    VERIFIED: "Verified",
    WELCOME_SCREEN_ENABLED: "Welcome Screen enabled",
    TICKETED_EVENTS_ENABLED: `Ticketed Events`,
    MONETIZATION_ENABLED: `Server monetization`,
    MORE_STICKERS: `More stickers`,
    THREE_DAY_THREAD_ARCHIVE: `3 day thread archive`,
    SEVEN_DAY_THREAD_ARCHIVE: `7 day thread archive`,
    PRIVATE_THREADS: `Private threads`,
}

module.exports = new Command({
    name: 'serverinfo',
    description: "Display the servers information\nCredit to Senpai#2473",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "MANAGE_GUILD",
    type: "TEXT",
    aliases: ["si", "server-info", "server"],
    cooldown: 7000,

    async run(message, args, client){

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const emojis = message.guild.emojis.cache;
        let features = message.guild.features;
        var featuresOfServer = Object.keys(featuresList).map((e, i, a) => {
            if (i == a.length - 1) {
                return `<:Kao_Reply:940971041621180437>${features.indexOf(e) > -1 ? `<:Kao_tickpng:941317360969728020>` : `<:kao_Cross:941317372852187137>`} ${featuresList[e]}`
            } else {
                return `<:Kao_ReplyCont:940971017826893844>${features.indexOf(e) > -1 ? `<:Kao_tickpng:941317360969728020>` : `<:kao_Cross:941317372852187137>`} ${featuresList[e]}`
            }
        })
        featuresOfServer = featuresOfServer.join(`\n`)

        const embed1 = new Discord.MessageEmbed()
            .setTitle(`**Guild information for __${message.guild.name}__**`)
            .setColor('#00e3b9')
            .setDescription(`${message.guild.description || 'No Server Description'}`)
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addFields({
                name: '<a:kao_right_Arrow:941348586438934628> MEMBERS',
                value: `**<:Kao_ReplyCont:940971017826893844> Member Count:** \`${message.guild.memberCount}\`\n**<:Kao_ReplyCont:940971017826893844> Humans:** \`${message.guild.members.cache.filter(member => !member.user.bot).size}\`\n**<:Kao_ReplyCont:940971017826893844> Bots:** \`${members.filter(member => member.user.bot).size}\`\n**<:Kao_ReplyCont:940971017826893844> Users online:** \`${message.guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'idle').size}/${message.guild.members.cache.size}\`\n**<:Kao_ReplyCont:940971017826893844> <:kao_online:941347629726568488> Online:** \`${message.guild.members.cache.filter(m => m.presence?.status === 'online').size}\`\n**<:Kao_ReplyCont:940971017826893844> <:Kao_idle:941347272074080336> Idle:** \`${message.guild.members.cache.filter(m => m.presence?.status === 'idle').size}\`\n**<:Kao_ReplyCont:940971017826893844> <:kao_dnd:941347946501394532> DND:** \`${message.guild.members.cache.filter(m => m.presence?.status === 'dnd').size}\`\n**<:Kao_Reply:940971041621180437> <:kao_offline:941347804092174417> Offline:** \`${message.guild.members.cache.size - message.guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'dnd' || m.presence?.status === 'idle').size}\``
            }, {
                name: '<a:kao_right_Arrow:941348586438934628> GENERAL',
                value: `**<:Kao_ReplyCont:940971017826893844>Name: [${message.guild.name}](https://youtube.com)**\n**<:Kao_ReplyCont:940971017826893844> Server ID:** \`${message.guild.id}\`\n**<:Kao_ReplyCont:940971017826893844> Owner:** <@${message.guild.ownerId}>\`(${message.guild.ownerId})\`\n**<:Kao_ReplyCont:940971017826893844> Boost Tier:** \`Tier ${message.guild.premiumTier.charAt(5)}\`\n<:Kao_ReplyCont:940971017826893844> **Boost Count:** \`${message.guild.premiumSubscriptionCount || '0'}\`\n**<:Kao_ReplyCont:940971017826893844> Explicit Filter:** \`${filterLevels[message.guild.explicitContentFilter]}\`\n**<:Kao_ReplyCont:940971017826893844> Verification Level:** \`${verificationLevels[message.guild.verificationLevel]}\`\n**   <:Kao_Reply:940971041621180437> Time Created:** \`${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} (${moment(message.guild.createdTimestamp).fromNow()})\``
            }, {
                name: '<a:kao_right_Arrow:941348586438934628> STATISTICS',
                value: `**<:Kao_ReplyCont:940971017826893844> Role Count:** \`${roles.length}\`\n**<:Kao_ReplyCont:940971017826893844> Emoji Count:** \`${emojis.size}\`\n**<:Kao_ReplyCont:940971017826893844> Regular Emojis:** \`${emojis.filter(emoji => !emoji.animated).size}\`\n**<:Kao_ReplyCont:940971017826893844> Animated Emojis:** \`${emojis.filter(emoji => emoji.animated).size}\`\n**<:Kao_ReplyCont:940971017826893844> Text Channels:** \`${message.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size}\`\n**   <:Kao_Reply:940971041621180437> Voice Channels:** \`${message.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size}\``
            }

            )

            .setTimestamp()
        if (message.guild.features.indexOf('BANNER') > -1) embed1.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=2048`)

        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(", ");
        if (rolemap.length > 1024) rolemap = "***Waaa~*\n There is too many roles to display**";
        if (!rolemap) rolemap = "***Waa~*\n There are no roles!**"

        


        const embed2 = new Discord.MessageEmbed()
        .setTitle(`Role List for _${message.guild.name}_`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setColor('#00e3b9')
        .addFields({
            name: `Roles: [${message.guild.roles.cache.size}]`,
            value: `${rolemap}` 
        })
        if (message.guild.features.indexOf('BANNER') > -1) embed2.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=2048`)

        const embed3 = new Discord.MessageEmbed()
            .setTitle(`Guild information for __${message.guild.name}__`)
            .setDescription(`<a:kao_right_Arrow:941348586438934628> **FEATURES**\n${featuresOfServer}`)
            .setColor('#00e3b9')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
        if (message.guild.features.indexOf("INVITE_SPLASH") > -1) embed3.setImage(`https://cdn.discordapp.com/splashes/${message.guild.id}/${message.guild.splash}.png?size=2048`)
    
        const embedslist = [embed1, embed2, embed3]
        paginate(message, embedslist);

    }
})
