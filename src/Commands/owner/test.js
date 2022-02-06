const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')

module.exports = new Command({

    name: "test",
    aliases: [''], 
    description: 'custom embed',
    type: 'TEXT',
    userPermissions: "ADD_REACTIONS",
    botPermissions: "ADMINISTRATOR",
    cooldown: 4000,

    async run(message, args, client, Embed) {
        const embed = new Embed()
        .title("Embed")
        .color()
        .timestamp()
        .description("Yes")
        .footer("This is a footer")
        .image(message.author.displayAvatarURL({ dynamic: true }))
        .author(message.author.tag);
      message.channel.send({embeds: [embed]});

    }
})
