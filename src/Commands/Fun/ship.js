const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const Canvas = require('canvas')
module.exports = new Command({
    name: "ship",
    description: "Ships you with someone",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 10000,
    type: "TEXT",
    async run(message, args, client) {
        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext("2d")
        const Target = message.mentions.users.first()
        if(!Target) return message.channel.send("Please mention someone to ship yourself with.")
        if(Target.id === message.author.id) return message.channel.send("Waa~~ you can not ship yourself with yourself 💔")
        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/914003414273388544/914356300924747836/667336.jpg")
       ctx.drawImage(bg, 0, 0, canvas.width, canvas.height) 
       const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: 'png'}))
        ctx.drawImage(avatar, 100, 25, 200, 200)
        const TargetAvatar = await Canvas.loadImage(Target.displayAvatarURL({format: 'png'}))
        ctx.drawImage(TargetAvatar, 400, 25, 200, 200)
        const heart = await Canvas.loadImage("https://media.discordapp.net/attachments/914003414273388544/914359675082919996/heart-emoji.png?width=492&height=388")
        const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/914003414273388544/914359186035445780/photos-broken-heart-9.png")
        const random = Math.floor(Math.random() * 99) +1
        if(random >= 50) {
            ctx.drawImage(heart, 275, 60, 150, 150)
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new Discord.MessageEmbed()
            .setDescription(`**:revolving_hearts: ${message.author.username} was shipped with ${Target.username} and they got %${random}**`)
            .setImage(`attachment://love.png`)
            .setColor("RANDOM")
            return  message.channel.send({embeds: [embed], files: [attachment]})
        } else {
            ctx.drawImage(broken, 275, 60, 150, 150)
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new Discord.MessageEmbed()
            .setDescription(`**:revolving_hearts: ${message.author.username} was shipped with ${Target.username} and they got %${random}**`)
            .setImage(`attachment://love.png`)
            .setColor("RANDOM")
            return message.channel.send({embeds: [embed], files: [attachment]})
        }
}})
