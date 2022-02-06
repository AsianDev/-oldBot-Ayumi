const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
name: "kiss",
type: "TEXT",
description: "sends a anime kissing gif",
userPermissions: ["SEND_MESSAGES"],
cooldown: 10000,
async run(message, args, client) {
    const member = message.mentions.members.first() || message.author
  const schema = require("../../models/animeProfileData.js");

  let profileData;
          try {
              profileData = await schema.findOne({
                  userID: member.id
              });

              if (!profileData) {
                  const Data = await schema.create({
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
                      KissAmount: 1
                  }
              });

  let dies = [
    `${message.author.username} kisses ${member}`,
    `${member} has been kissed by ${message.author}`,
    `${member} has been kissed! <:Blush:897355536939507712>`,
    `${message.author} kisses ${member}`,
    `${member} was kissed by ${message.author}`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/kiss/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
        if(!profileDatas.KissAmount) return console.log('No kisses for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/kiss/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setFooter({ text: `${member.user.username} has been kissed ${profileDatas.KissAmount} times.`})
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`**${die}**`)
        message.channel.send({
            embeds: [embed1]})
    }
}
})