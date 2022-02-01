const Discord = require("discord.js");
const nekoapi = require('cacao_nekoapi');

module.exports = {
    name: 'run',
    description: "sends a running gif / image",
    type: "TEXT",
    cooldown: 10000,
    userPermissions: ["SEND_MESSAGES"],
    async run (message, args, client) {

        const image = await nekoapi.action.run()

        const embed = new Discord.MessageEmbed()
        .setImage(image.url)
        .setColor("RANDOM")
        message.channel.send({ embeds: [embed] });
    },
};