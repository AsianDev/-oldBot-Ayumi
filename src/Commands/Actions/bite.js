
const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
    const Discord = require('discord.js')

module.exports = new Command({
name: 'bite',
cooldown: 6000,
type: "TEXT",
description: "sends a anime gif of you biting a mentioned user",
userPermissions: ["SEND_MESSAGES"],
async run(message, args, client) {

    const member = message.mentions.members.first() || message.author

     const schema = require("../../config/models/animeProfileData.js");
                
        let profileData;
                try {
                    profileData = await schema.findOne({
                        userID: member.id
                    });
    
                    if (!profileData) {
                        let Data = await schema.create({
                            userID: member.id
                        });
                        Data.save();
                    }
                } catch (err) {
                    console.log(err);
                }
    
        await schema.findOneAndUpdate({
                        userID: member.id
                    }, {
                        $inc: {
                            BiteAmount: 1
                        }
                    });
        
            if (message.mentions.members.size === 0) {
                fetch(
                    `https://kawaii.red/api/gif/bite/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
                    .then(res => res.json()
                        .then(url => {
                            const embed = new Discord.MessageEmbed()
                            .setImage(`${url.response}?size=1024`)
                            .setColor("RANDOM")
                            message.channel.send({ embeds: [embed] })
                        }))
            }
    else if (message.mentions.members.size !== 0) {
    

        let bites = [
            `${member} was bitten by ${message.author}`,
            `${member} has been bitten by ${message.author}`,
            `${message.author} bites ${member} `,
            `${member} has been bitted`,
           ];            
    const bite = bites[Math.floor(Math.random() * bites.length)];


    const profileDatas = await schema.findOne({ userID: member.id });
    if(!profileDatas.BiteAmount) return console.log('No bites for ' + member.user.tag);

            const url = await fetch(`https://kawaii.red/api/gif/bite/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
            const embed1 = new Discord.MessageEmbed()
            .setImage(`${url.response}?size=1024`)
            .setColor("RANDOM")
            .setDescription(`**${bite}**`)
            .setFooter({ text:  `${member.user.username} has been bitten ${profileDatas.BiteAmount} times.`})
            message.channel.send({
                embeds: [embed1]})}}})