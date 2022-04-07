const { Client, Message, MessageAttachment } = require("discord.js");
const canvas = require("canvacord");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
name: "wasted",
description: "generates a wasted image",
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

const user = message.mentions.users.first() || message.author
const avatar = user.displayAvatarURL({ format: "png" });
const image = await canvas.Canvas.wasted(avatar);
message.channel.send({
    files: [
        new MessageAttachment(image, 'image.png')
    ]
    })
}})