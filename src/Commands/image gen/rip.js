const { Canvas } = require("canvacord");
const Discord = require("discord.js")
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
name: "rip",
description: "generates a rip image",
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["ADMINISTRATOR"],
 type: "Text",
cooldown: 10000,

/**
*
* @param {Client} client
* @param {Message} message
* @param {string[]} args {}
*/
async run(message, args, client) {

    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.rip(avatar);

    message.channel.send({files: [new Discord.MessageAttachment(image, "rip.png")]});
}})