const Command = require('../../Structures/Handlers/Command.js')
const axios = require('axios').default
const Discord = require('discord.js')

module.exports = new Command({
name: "waifu",
type: "TEXT",
cooldown: 10000,
description: "sends a anime waifu gif",
userPermissions: ["SEND_MESSAGES"],
async run(message, args, client) {
    const { url } = await axios.get("https://api.waifu.pics/sfw/waifu")
      .then((res) => res.data);


    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setImage(url)

    message.channel.send({embeds: [embed]});
}});