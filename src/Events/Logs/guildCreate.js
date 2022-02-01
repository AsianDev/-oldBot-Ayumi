const Event = require("../../Handlers/Event.js");
const Discord = require('discord.js')

module.exports = new Event("guildCreate", (client, guild, message, invite) => {

    const ch = guild.channels.cache.filter(c => c.name.includes('general')).first() || guild.channels.cache.filter(c => c.name.includes('chat')).first() || guild.channels.cache.filter(c => c.name.includes('lounge')).first() || guild.systemChannel || guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').first()
    if (!ch) return;
    
    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
            .setLabel("Main server")
            .setStyle('LINK')
            .setURL('https://discord.gg/TQ3mTPE7Pf')
            )

    const Invite = new Discord.MessageEmbed()
    .setTitle("*Waa~* Thanks for adding me! <:Iki_Sakura:897357779956793356>")
    .setURL("https://discord.gg/TQ3mTPE7Pf")
    .setDescription(`Thanks for adding <@!${client.user.id}> to ${message.guild.name}. I will server my best here!`)
    .addField("<a:Kao_crown:935906010122559548> My Main Features include:", `<a:arrow:936271087128420375> **40+** Anime commands\n <a:arrow:936271087128420375> **30+** Moderation and Adminstration Commands\n <a:arrow:936271087128420375> Many **fun** and **informatic** Commands\n <a:arrow:936271087128420375> **Welcome** and **leave** Cards \n\n <:Iki_tick:904736864076955738> Much more features to come.`, true)
    .setImage("https://media.discordapp.net/attachments/893441333300178964/923903676786049044/PicsArt_12-24-07.43.07.jpg?width=869&height=498")
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(`#4D9AE6`) 
    .setFooter({ text: "Thanks for inviting me <3"})

    if (invite.guild.me.permissionsIn(invite.channel).has("CREATE_INSTANT_INVITE" || "ADMINISTRATOR")) {
	    invite.channel.createInvite({ maxAge: 0, maxUses: 0 }).then(i => { 

            const logsChannel = "935866768424063046"

            const Invited = new Discord.MessageEmbed()
            .setTitle("*Waa~* I have joined a new Sever! <:Iki_Sakura:897357779956793356>")
            .setURL("https://discord.gg/TQ3mTPE7Pf")
            .setDescription(`I have been added to a new Server!`)
            .addField("<a:Kao_crown:935906010122559548> Invite link:", `${i}`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)

            logsChannel.send({embeds: [Invited]})

        })}
    if (guild.me.permissionsIn(ch).has("EMBED_LINKS")) ch.send({ embeds: [Invite], components: [row]})

})