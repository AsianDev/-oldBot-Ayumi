
const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');

module.exports = new Command({
    name: 'serverinfo',
    description: "Display the servers information",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    aliases: ["si", "server-info"],
    cooldown: 10000,

    async run(message, args, client){

        const guild = message.guild;
        
        const members = await guild.members.fetch()
        const humans = members.filter(member => !member.user.bot).size
        const bots = members.filter(member => member.user.bot).size

        const boosts = guild.premiumSubscriptionCount

        const boosters = members
        .filter( member => {
          return member.premiumSince !== null
        }).size
        const boosterNames = members
        .filter( member => {
          return member.premiumSince !== null
        }).map(member => member.user.tag)

        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(role => role.toString());
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`_${message.guild.name}_`)
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField('ID of server', message.guild.id)
            .addField('👑 Owner', `${(await message.guild.fetchOwner()).user}`)
            .addField("Description", `${guild.description || "No description"}`, true)
            .addField("Rules Channel", `${guild.rulesChannel}`, true)
            .addField("AFK Channel", `${guild.afkChannel}`, true)
            .addField("Partnered?", `${guild.partnered}`, true)
            .addField("Total members", `${guild.memberCount}`, true)
            .addField("Humans",`${humans}`, true)
            .addField("Bots", `${bots}`, true)          
            .addField('No. of Text Channel\'s', message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString())
            .addField('No. of Voice Channel\'s', message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString())
            .addField('Total Amount of Roles', message.guild.roles.cache.size.toString())
            .addField('🔗 Vanity Invite Link', `${vanityInvite}`)
            .addField("Boost Count", `${guild.premiumSubscriptionCount || "0"}`)
            .addField("Boost Tier", `${guild.premiumTier ? `Boost: ${guild.premiumTier}` : "None"}`)
            .addField("Number of Boosters",`${boosters}`, true)
            .addField('🔐 Verification Level', message.guild.verificationLevel.toString())
            .addField(`Roles [${roles.length}]`, roles.length < 5 ? roles.join(' | ') : roles.length > 5 ? `${roles.slice(0, 5).join(' | ')} | \`+ ${roles.length - 5} roles...\`` : 'None')
              if (message.guild.features.indexOf('BANNER') > -1) embed.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=2048`)
        message.channel.send({embeds: [embed]});
    }
})