const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
    name: "wallpaper",
    description: "Anime wallpaper images",
      userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",    
    cooldown: 10000,
type: "Text",

    async run(message, args, client) {

    const image = ['https://bit.ly/3FpMkqn', 'https://bit.ly/3CcZZie', 'https://bit.ly/3C6imFz', 'https://bit.ly/3FaPo9C', 'https://bit.ly/3FaPo9C', 'https://bit.ly/3wFcVfM', 'https://bit.ly/3F7BYeq', 'https://bit.ly/3DaB8gq', 'https://bit.ly/3HdwDnD', 'https://bit.ly/3kxzAWC', 'https://bit.ly/3CdNymm', 'https://bit.ly/31WAZQ3', 'https://bit.ly/30dwdwz', 'https://bit.ly/3c5r8ZZ', 'https://bit.ly/3C979E8', 'https://bit.ly/3FaQvGo', 'https://bit.ly/3qqTC8W', 'https://bit.ly/3wGbVbb', 'https://bit.ly/31Wz267', 'https://bit.ly/3HidzVx', 'https://bit.ly/3wD3eyu', 'https://bit.ly/3c7tEiu', 'https://bit.ly/30osHQj', '']

    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(image[Math.floor(Math.random() * image.length)])

        message.channel.send({embeds: [embed]});


}});

