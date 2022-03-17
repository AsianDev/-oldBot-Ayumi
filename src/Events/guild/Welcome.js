const Event = require('../../../Structures/Handlers/Event.js')
const Discord = require("discord.js");
const { registerFont } = require("canvas")
registerFont( "./src/config/assets/fonts/Anton-Regular.ttf", { family: 'Anton' })
module.exports = new Event("guildMemberAdd", async (client, member) => { 
    const guildConfig = require('../../Structures/models/guildConfig.js')
    const data = await guildConfig.findOne({guildId: member.guild.id})
    if (!data) return;
    const channel = member.guild.channels.cache.find(c => c.id === data.welcomeChannel)
    if (!channel) return;
    if (member.user.bot) return;
    const Canvas = require('canvas')
    let canvas = Canvas.createCanvas(1024, 500); 
    let context2 = canvas.getContext('2d'); 
    const background = await Canvas.loadImage("./src/config/assets/image/Ikigai_Welcome.jpg");
    context2.drawImage(background, 0, 0, canvas.width, canvas.height);
    context2.font = '59px Anton',
    context2.fillStyle = '#f7faf7';
    context2.shadowColor = '#030303',
    context2.textAlign = "start",
    context2.fillText("WELCOME")
    //
    context2.font = '80px Anton',
    context2.fillStyle = '#f7faf7';
    context2.shadowColor = '#030303',
    context2.textAlign = 'center',
    context2.fillText(member.user.username, 512, 410)
    context2.font = '49px Anton',
    context2.fillStyle = '#f7faf7';
    context2.shadowColor = '#030303',
    context2.fillText(`Welcome! You're the ${member.guild.memberCount}th member`, 512, 455)
    context2.beginPath()
    context2.arc(512, 166, 118, 0, Math.PI * 2, true)
    context2.closePath()
    context2.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 1024 }))
    .then(image => {
        context2.drawImage(image, 393, 47, 238, 238);
    })
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Ikigai_welcome.jpg')
    let embed = new Discord.MessageEmbed()
    .setAuthor({ name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL()}`})
    .setImage('attachment://Ikigai_welcome.jpg')
    .setDescription(`**${member.guild.name}**   へようこそ <@${member.user.id}>. Enjoy your stay.`)
    try {
        channel.send({content: `<@${member.user.id}>`, embeds: [embed], files: [attachment]})
    } catch (error) {
    }
})