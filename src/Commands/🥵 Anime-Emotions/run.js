const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'run',
    description: "sends a running gif / image",
    
    cooldown: 4000,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: 'SEND_MESSAGES',
type: "Text",
    async run (message, args, client) {

        const image = await nekoapi.action.run()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};