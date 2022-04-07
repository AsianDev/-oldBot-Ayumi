const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const fs = require('fs')
module.exports = new Command({

    name: 'commandinfo',
    aliases: ['cmd-help', "commandhelp", "command-help", "cmdhelp", "commandinfo", "command-info", "cmd-info", 'ci'], 
    description: "gives information on a command",
    type: "Text",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {


      const cmd = client.commands.find(cmd => cmd.name == args[1].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[1].toLowerCase()))
      if(!cmd) return

        const directories = []
        fs.readdirSync('./src/Commands').forEach(dir => {
          directories.push(dir)
         })
      directories.forEach(dir => {
        fs.readdirSync(`./src/Commands/${dir}`)
        .filter(file => file.endsWith('.js'))
        /**
         * @type {Command[]}
         */
          })
      
      let cmdInfoEmbed = new Discord.MessageEmbed()
         .setColor(colour['celestial blue'])
         .setAuthor({ name: `${cmd.name} Help Menu`, iconURL: `${client.user.displayAvatarURL()}`})
         .setDescription("```yaml\n Syntax: Ayu help <Command Name>```")
          .addField("Description:", `> ${cmd.description  ||  `${emotes.Error} No Description`}`)
          .addField("Permissions:", `> **__User:__**\n >  \`${cmd.userPermissions || `${emotes.Error} No Permission`}\`\n > **__Ayumi__**\n > \`${cmd.botPermissions}\``)
          .addField("Cooldown:", `>  ${cmd.cooldown || `${emotes.Error} No Cooldown`}`)
          .addField("Aliases:", `> ${cmd.aliases.join(", ") || `${emotes.Error} No Aliases`}`)
      message.channel.send({embeds: [cmdInfoEmbed]})
                  
    }
})
