const { MessageEmbed } = require("discord.js");
const muteSchema = require("../../Structures/models/muterole.js")
const Command = require('../../Structures/Handlers/Command.js')
const removerole = require("../../Structures/models/removerole.js")
const Discord = require("discord.js")
const colour = require("../../config/assets/Json/colours.json")
const emotes = require("../../config/assets/Json/emotes.json")

module.exports = new Command({
  name: "mute",
  description: "mute a user",
  type: "TEXT",
  cooldown: 10000,
  aliases: ["silence", "mut", "muute"],
  userPermissions: "KICK_MEMBERS",
  botPermissions: "MANAGE_ROLES",
  maintance: true,
    async run(message, args, client) {
        const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(m => m.id === args[1]) :  message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
        if (!member) {
            return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour["pale red"]) 
                .setDescription("*Waa~~* please mention a user to mute!")
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)   
            ]});
        }
        if (member.id === message.author.id) {
            return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour["pale red"]) 
                .setDescription("Are you dumb? you cant mute yourself o.o")
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)   
            ]});
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
            if (!data) return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                .setDescription("*Bakaa~* This user is not muted!")
                .setColor(colour["pale red"])
            ]})
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