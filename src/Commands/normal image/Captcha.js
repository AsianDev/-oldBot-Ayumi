const { Captcha } = require('captcha-canvas')
const { MessageAttachment } = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "captcha",
    description: "Captcha system",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    cooldown: 10000,

    aliases:["verification"],
    async run(message, args, client) {

        const captcha = new Captcha(); 
        captcha.async = true 
        captcha.addDecoy(); 
        captcha.drawTrace(); 
        captcha.drawCaptcha(); 

        const captchaAttachment = new MessageAttachment(await captcha.png, "captcha.png");

        message.channel.send({files: [captchaAttachment], content: "Not a real captcha."})

    }
})