const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
    
name: "hug",
 type: "Text",
description: "sends a anime hugging gif",
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["SEND_MESAGES"],
cooldown: 10000,

async run(message, args, client) {
    const member = message.mentions.members.first() || message.author
  const schema = require("../../config/models/animeProfileData.js");

  let profileData;
          try {
              profileData = await schema.findOne({
                  userID: member.user.id
              });

              if (!profileData) {
                  let Data = await schema.create({
                      userID: member.user.id
                  });
                  Data.save();
              }
          } catch (err) {
              console.log(err);
          }

  await schema.findOneAndUpdate({
                  userID: member.user.id
              }, {
                  $inc: {
                      HugAmount: 1
                  }
              });


  let dies = [
    `${message.author} hugs ${member}`,
    `${member} has been hugged by ${message.author}`,
    `${member} has been hugged! <:Blush:897355536939507712>`,
    `${message.author} hugs ${member}`,
    `${member} has been adored by ${message.author}`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];
    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/hug/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
        if(!profileDatas.HugAmount) return console.log('No hugs for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/hug/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
            .setDescription(`**${die}**`)
            .setFooter({ text
: `${member.user.username} has been hugged ${profileDatas.HugAmount} times.`})
        message.channel.send({
            embeds: [embed1]})
    }
}
})