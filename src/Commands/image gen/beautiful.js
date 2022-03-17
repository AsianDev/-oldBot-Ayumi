const { Client, Message, MessageAttachment } = require("discord.js");
const canvas = require("canvacord");
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({
name: "beautiful",
description: "generates a beautiful image",
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["ADMINISTRATOR"],
aliases: ["pretty"],
cooldown: 10000,

type: "TEXT",
/**
*
* @param {Client} client
* @param {Message} message
* @param {string[]} args {}
*/
async run(message, args, client) {

const user = message.mentions.users.first() || message.author
const avatar = user.displayAvatarURL({ format: "png" });
const image = await canvas.Canvas.beautiful(avatar);
message.channel.send({
    files: [
        new MessageAttachment(image, 'image.png')
    ]
    })
}})