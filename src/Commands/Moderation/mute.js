const { MessageEmbed } = require("discord.js");
const muteSchema = require("../../util/models/muterole.js")
const Command = require('../../Handlers/Command.js')
const removerole = require("../../util/models/removerole.js")
const Discord = require("discord.js")
module.exports = new Command({
  name: "mute",
  description: "mute a user",
  type: "TEXT",
  cooldown: 10000,
  aliases: ["silence", "mut", "muute"],
  userPermissions: "KICK_MEMBERS",
  botPermissions: ["ADMINISTRATOR"],
    async run(message, args, client) {
        const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
        if (!member) {
            return message.channel.send("*Waa~~* please mention a user to unmute!");
        }
        if (member.id === message.author.id) {
            return message.channel.send("Are you dumb? you cant mute yourself o.o");
        }
        let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reason has been provided."

        const mute = new MessageEmbed()
        .setTitle('<:tick:904736864076955738> Mute Added!')
        .setColor("GREEN")     
        .addField("Muted:", `${member}`)
        .addField("Reason:",`${reason}`)      
        .setTimestamp()

        muteSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return;
            if (data) {
                const role = member.guild.roles.cache.find(role => role.id == data.Role);
                if (!role) {
                    return data.delete()
                }
                if (!role.id) {
                    return message.reply("*Bakaa!* The mute role has not been set yet, please set the mute role and try again!");
                }
                await member.roles.add(role.id);
            }
        });
        removerole.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return;
            if (data) {
                const role = member.guild.roles.cache.find(role => role.id == data.Role);
                if (!role) {
                    return data.delete()
                }
                if (!role.id) {
                    return message.reply("*Bakaa!* The role to be removed has not been set yet, please set the role and try again!");
                }
                await member.roles.remove(role.id);
            }
        });
           message.channel.send({embeds: [mute]})
           client.channels.cache.get("924889631303012363").send({embeds: [mute]})

    }
})