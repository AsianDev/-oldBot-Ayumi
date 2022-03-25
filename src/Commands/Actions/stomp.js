const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'stomp',
cooldown: 10000,
description: "sends an anime gif of stomping",
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: "ADMINISTRATOR",
 type: "Text",
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
                        stompAmount: 1
                    }
                });



    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/stomp/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }

    else if (message.mentions.members.size !== 0) {

        
    const profileDatas = await schema.findOne({ userID: member.id });
    if(!profileDatas.StompAmount) return console.log('No stomps for ' + member.user.tag);

        let stomp = [
            `${message.author.tag} stomps on ${member.user}`,
            `${message.author.tag} stomped on ${member.user}`
        ]

        const stepped = stomp[Math.floor(Math.random() * stomp.length)];

        const url = await fetch(`https://kawaii.red/api/gif/stomp/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`**${stepped}**`)
        .setFooter({ text
: `${member.user.username} has been stomped on ${profileDatas.stompAmount} times.`})

        message.channel.send({
            embeds: [embed1]})
    }
}
})