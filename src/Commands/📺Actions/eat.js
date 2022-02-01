const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'eat',
    description: "sends a eating gif / image",
    type: "TEXT",
    userPermissions: ["SEND_MESSAGES"],
    cooldown: 10000,

    async run (message, args, client) {

        const image = await nekoapi.action.eat()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};