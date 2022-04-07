const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'cook',
    description: "sends a cooking gif / image",
        botPermissions: 'SEND_MESSAGES',
    type: "Text",
    cooldown: 10000,
    userPermissions: ["SEND_MESSAGES"],
    async run (message, args, client) {

        const image = await nekoapi.action.cook()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};