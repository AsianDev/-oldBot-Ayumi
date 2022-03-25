const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'drive',
    cooldown: 10000,
    description: "sends a driving gif / image",
    botPermissions: 'SEND_MESSAGES',
type: "Text",
    userPermissions: ["SEND_MESSAGES"],
    async run (message, args, client) {

        const image = await nekoapi.action.drive()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};