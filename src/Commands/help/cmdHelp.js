const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'info',
    aliases: ['cmd-help', "commandhelp", "command-help", "cmdhelp", "commandinfo", "command-info", "cmd-info"], 
    description: "gives information on a command",
 type: "Text",
  botPermissions: "SEND_MESSAGES",
cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {


        const fs = require('fs')
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
      
                    const cmd = client.commands.find(cmd => cmd.name == args[1].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[1].toLowerCase()))
                    if(!cmd) return
      
                    let cmdInfoEmbed = new Discord.MessageEmbed()
                    .setColor(colour['celestial blue'])
                    .setAuthor({ name: `${cmd.name} Help Menu`, iconURL: `${client.user.displayAvatarURL()}`})
                    .setDescription("```yaml\n Syntax: Kao help <Command Name>```")
                    .addField("Description:", `> ${cmd.description  || "<:kao_Cross:941317372852187137> None"}`)
                    .addField("Permissions:", `> **__User:__**\n >  \`${cmd.userPermissions || "<:kao_Cross:941317372852187137> None"}\`\n > **__Ayumi__**\n > \`${cmd.botPermissions}\``)
                    .addField("Cooldown:", `>  ${cmd.cooldown || "<:kao_Cross:941317372852187137> None"}`)
                    .addField("Aliases:", `> ${cmd.aliases.join(", ") || "<:kao_Cross:941317372852187137> None"}`)
                    message.channel.send({embeds: [cmdInfoEmbed]})
                  
    }
})
