const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const Schema = require("../../config/models/ping.js")

module.exports = new Command({
  
    name: 'ghostping',
    description: "Enable/Disable Anti Ghost Ping Module",
    aliases: ['gp'],
    type: 'TEXT',
    userPermissions: "MANAGE_GUILD",
    botPermissions: "MANAGE_GUILD",
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        options = [
            'enable',
            'disable'
          ]
      
          if (!args.length) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* Please choose to either ``Enable`` or ``Disable`` AutoMod Ghost pings!")
        ]})
          const opt = args[1].toLowerCase();
          if (!opt) return  message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* Please choose to either ``Enable`` or ``Disable`` AutoMod Ghost pings!")
        ]})
      
          if (!options.includes(opt)) return  message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor(colour['pale red'])
            .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            .setDescription("*Waa~* Please choose to either ``Enable`` or ``Disable`` AutoMod Ghost pings!")
        ]})
      
         if(opt == 'enable') {
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setDescription("*Waa~* Ghost ping detection has already been enabled!")
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            ]})
            new Schema({
              Guild: message.guild.id
            }).save()
            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour.pink)
                .setDescription("(´｡• ω •｡`) I have enabled the ghost ping detection!")
                .setTitle(`${emotes.Tick} GHOST PING ENABLED!`)
            ]})
          })
         }
      
         if(opt == 'disable'){
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setDescription("*Waa~* Ghost ping detection is already disabled!")
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            ]})
            data.delete()
            message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour.pink)
                .setDescription("(´｡• ω •｡`) I have disabled the ghost ping detection!")
                .setTitle(`${emotes.Tick} GHOST PING DISABLED!`)
            ]})          })
         }

    }
})
