const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: 'create-template',
    aliases: ['createtemplate', "make-template", "maketemplate", "cloneserver", "clone-server"], 
    description: "make a template of the server you run this command in",
 type: "Text",
    userPermissions: "",
    owner: true,
    botPermissions: ["ADMINISTRATOR"],
 type: "Text",cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        const guild = message.guild;
        try {
          (await guild.createTemplate(guild.name)).sync().then((t) => {
            const createTemplate = new Discord.MessageEmbed()
              .setTitle("SERVER TEMPLATE")
              .addField("URL", `${t.url}`)
              .setColor(colour.pink)
            return message.reply({ embeds: [createTemplate], allowedMentions: {repliedUser: false} })
          })
        } catch (error) {
          const templateCreated = new Discord.MessageEmbed()
            .setTitle(`SERVER TEMPLATE`)
            .addField("URL", `${(await guild.fetchTemplates()).map(v => v.url)}`)
            .setColor(colour['angel white'])
          return message.reply({ embeds: [templateCreated], allowedMentions: {repliedUser: false} })
        }

    }
})
