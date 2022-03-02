const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
module.exports = new Command({
    name: "bannedmembers",
    description: "Gets a list of banned members",
    type: "TEXT",
    aliases: ["ban-list", "blist", "banned-members", "bannedmember", "banned-list", "banlist"],
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: "VIEW_AUDIT_LOG",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    
     async run(message, args, client) {
        const fetchBans = message.guild.bans.fetch();
        if (!fetchBans) {
            const NoBannedUsersEmbed = new Discord.MessageEmbed()
            .setColor("#35AAE1")
            .setDescription('This server does not have any banned members.')
                .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                return message.channel.send(NoBannedUsersEmbed);
        } else {

            const bannedMembers = (await fetchBans)

            .map((member) => `\`\`\`ini\n [ User: ${member.user.tag}  Reason: ${member.reason} ]\`\`\``)
            .join("\n\n")
           

            const embed = new Discord.MessageEmbed()
            .setTitle(`Banned users in ${message.guild.name}`)
            .setDescription(bannedMembers)
            .setColor("#35AAE1")
            .setFooter({text: `Banned members in ${message.guild.name}`, iconURL: client.user.displayAvatarURL()})


            message.channel.send({ embeds: [embed]})
        }}})