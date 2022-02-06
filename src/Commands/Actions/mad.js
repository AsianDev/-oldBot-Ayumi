const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'mad',
type: "TEXT",
cooldown: 10000,
aliases: ["angry", "angy", "angwy"],
description: "shows an anime gif where your made",
userPermissions: ["SEND_MESSAGES"],
async run(message, args, client) {
    const member = message.mentions.members.first() || message.author
    const schema = require("../../models/animeProfileData.js");

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
                        MadAmount: 1
                    }
                });



    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/mad/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                        .setTitle(`${message.author.tag} is mad!`)
                    message.channel.send({ embeds: [embed] })
                }))
    }

    else if (message.mentions.members.size !== 0) {


        
    const profileDatas = await schema.findOne({ userID: member.id });
    if(!profileDatas.MadAmount) return console.log(' 0 times being mad ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/mad/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`${message.author} is mad at ${member}`)
        .setFooter({ text: `${member.user.username} has been mad at ${profileDatas.MadAmount} times.`})

        message.channel.send({
            embeds: [embed1]})
    }
}
})