
const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');

module.exports = new Command({
    name: 'serverinfo',
    description: "Display the servers information",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    aliases: ["si", "server-info"],
    cooldown: 10000,

    async run(message, args, client){
        
        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`_${message.guild.name}_`)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .addFields(
              {
              name: "🌍 | General",
              value: 
              `
              - **Name**: ${message.guild.name}
              - **Owner**: <@${message.guild.ownerId}>
              - **Created**: <t:${parseInt(message.guild.createdTimestamp / 1000)}:R>
             
              - **Rules**: ${message.guild.rulesChannel || "No Rules Channel"}
              - **AFK Channel**: ${message.guild.afkChannel || "No Afk Channel"}
              - **Partnered**: ${message.guild.partnered}
              - **Vanity URL**: ${vanityInvite}
              `
              },
              {
              name: "👥 | Users",
              value: 
              `
              - **Members**: ${message.guild.members.cache.filter((m) => !m.user.bot).size}
              - **Bots**: ${message.guild.members.cache.filter((m) => m.user.bot).size}
              
              - **Total**: ${message.guild.memberCount}
              `
              },
              {
              name: "📜 | Channels",
              value:
              `
              - **Text**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
              - **Voice**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
              - **Threads**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "PUILD_PUBLIC_THREAD").size}
              - **Categories**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
              - **Stages**: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
             
              - **Total**: ${message.guild.channels.cache.size}
              `
              },
              {
              name: "😁 | Emojis & Stickers",
              value: 
              `
              - **Animated**: ${message.guild.emojis.cache.filter((e) => e.animated).size}
              - **Normal**: ${message.guild.emojis.cache.filter((e) => !e.animated).size}
              - **Stickers**: ${message.guild.stickers.cache.size}
             
              - **Total**: ${message.guild.stickers.cache.size + message.guild.emojis.cache.size}
              
              `
              },
              {
              name: "🥳 | Boost Information",
              value: 
              `
              - **Tier**: ${message.guild.premiumTier.replace("TIER_", "")}
              - **Boosts**: ${message.guild.premiumSubscriptionCount}
              - **Boosters**: ${message.guild.members.cache.filter((m) => m.premiumSince).size}
              `
              }
              )

              if (message.guild.features.indexOf('BANNER') > -1) embed.setImage(`https://cdn.discordapp.com/banners/${message.guild.id}/${message.guild.banner}.png?size=2048`)
        message.channel.send({embeds: [embed]});
    }
})