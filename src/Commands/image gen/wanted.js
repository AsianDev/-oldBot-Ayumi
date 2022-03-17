const { Client, Message, MessageAttachment } = require("discord.js");
const canvas = require("canvacord");
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({
name: "wanted",
description: "generates a wanted image",
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["ADMINISTRATOR"],
type: "TEXT",
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
const image = await canvas.Canvas.wanted(avatar);
message.channel.send({
    files: [
        new MessageAttachment(image, 'image.png')
    ]
    })
}})