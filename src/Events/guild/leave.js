const Event = require('../../../Structures/Handlers/Event.js')

const Discord = require("discord.js");
const { registerFont } = require("canvas")
registerFont( "./src/config/assets/fonts/Anton-Regular.ttf", { family: 'Anton' })
module.exports = new Event("guildMemberRemove", async(client, member) => { 
    const guildConfig = require("../../Structures/models/guildConfig.js")
    const data = await guildConfig.findOne({guildId: member.guild.id})
    if (!data) return
    const channel = member.guild.channels.cache.find(c => c.id === data.leaveChannel)
    if (!channel) return;
    if (member.user.bot) return;
    const Canvas = require('canvas')
    let canvas = Canvas.createCanvas(1024, 500); 
    let context2 = canvas.getContext('2d'); 
    const background = await Canvas.loadImage("./src/config/assets/image/leave.jpg");
    context2.drawImage(background, 0, 0, canvas.width, canvas.height);
    context2.font = '60px Anton',
    context2.fillStyle = '#f7faf7';
    context2.shadowColor = '#030303',
    context2.textAlign = 'center',
    context2.fillText(member.user.username, 512, 410)
    context2.font = '42px Anton'
    context2.fillStyle = '#f7faf7';
    context2.shadowColor = '#030303',
    context2.fillText(`Goodbye! We are now at ${member.guild.memberCount} members`, 512, 455)
    context2.beginPath()
    context2.arc(512, 166, 118, 0, Math.PI * 2, true)
    context2.closePath()
    context2.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 1024 }))
    .then(image => {
        context2.drawImage(image, 393, 47, 238, 238);
    })
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'leave.jpg')
    let embed = new Discord.MessageEmbed()
    .setImage('attachment://leave.jpg')
    .setTitle(`${member.user.tag}`)
    .setDescription(`Goodbye! <@${member.user.id}>`)
    try {
        channel.send({embeds: [embed], files: [attachment]})
    } catch (error) {
    }
})