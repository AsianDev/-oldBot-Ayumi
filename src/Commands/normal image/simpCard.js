const Discord = require("discord.js");
const Canvas = require("canvas");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
name: "simp-card",
description: "generates a simp card",
aliases: ["simpcard", "scard"],
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["ADMINISTRATOR"],
type: "TEXT",
cooldown: 7000,

/**
*
* @param {Client} client
* @param {Message} message
* @param {string[]} args {}
*/
async run(message, args, client) {
    const member = message.mentions.members.first() || message.member;
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/765926464628719627/855686984042938368/Simp_Pop_Cat.png"
    );

    const canvas = Canvas.createCanvas(775, 575);
    const ctx = canvas.getContext(`2d`);

    ctx.drawImage(bg, 0, 0, 775, 575);
    ctx.drawImage(avatar, 30, 50, 303, 455);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "simpcard.jpg"
    );
    message.channel.send({files: [attachment]});
  },
})