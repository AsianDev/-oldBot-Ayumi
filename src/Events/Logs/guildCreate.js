const Event = require('../../Structures/Handlers/Event.js')
const Discord = require('discord.js')
const c = require("../../config/assets/Json/colours.json")

module.exports = new Event("guildCreate", async(client, guild, channel, invite) => {

    const ch = guild.channels.cache.filter(c => c.name.includes('general')).first() || guild.channels.cache.filter(c => c.name.includes('chat')).first() || guild.channels.cache.filter(c => c.name.includes('lounge')).first() || guild.systemChannel || guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').first()
    if (!ch) return;
    
    const owner = await guild.fetchOwner()
    
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel("Main server")
            .setStyle('LINK')
            .setURL('https://discord.gg/TQ3mTPE7Pf')
            )

    const Invite = new Discord.MessageEmbed()
    .setTitle("*Waaa~* Thanks for adding me! <:Iki_Sakura:897357779956793356>")
    .setURL("https://discord.gg/TQ3mTPE7Pf")
    .setDescription(`Thanks for adding <@!${client.user.id}> to ${guild.name}. I will do my best here!`)
    .addField("<a:Kao_crown:940625784199073812> Who am i:", `My name is **__Ayumi__**.\nI was developed by __Sensei | 旭陽#8751__ using javascript and discord.js.\n I have well over 200 commands with more coming.`, true)
    .setImage("https://cdn.discordapp.com/attachments/873149666282311680/940628803196186674/kaoaoaiao.png")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(`#4D9AE6`) 
    .setFooter({ text: "Thanks for inviting me <3... UwU"})

    if (guild.me.permissionsIn(ch).has("CREATE_INSTANT_INVITE" || "ADMINISTRATOR")) {
        ch.createInvite({ maxAge: 0, maxUses: 0 }).then(i => { 

            const Invited = new Discord.MessageEmbed()
            .setTitle("*Waaa~* I have joined a new Sever! <:Iki_Sakura:897357779956793356>")
            .setURL("https://discord.gg/TQ3mTPE7Pf")
            .setDescription(`I have been added to a new Server!`)
            .setColor(c.pink)
            .addField("<a:Kao_crown:940625784199073812> Invite link:", `${i}`)
            .addField("<a:Kao_crown:940625784199073812> Owner:", `${owner}`)
            .addField("<a:Kao_crown:940625784199073812> Members:", `${guild.memberCount}`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)

            client.channels.cache.get("935866768424063046").send({ embeds: [Invited]}) 

        })}
    if (guild.me.permissionsIn(ch).has("EMBED_LINKS")) ch.send({ embeds: [Invite], components: [row]})

})