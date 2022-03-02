const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
    
name: "tickle",
type: "TEXT",
description: "send a anime tickle gif",
userPermissions: ["SEND_MESSAGES"],
cooldown: 10000,

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
                      tickleAmount: 1
                  }
              });


  let dies = [
    `${message.author.username} tickles ${member}`,
    `${member} has been tickled by ${message.author.username}`,
    `${member} has been tickled`,
    `${message.author.username} tickled ${member}`,
    `${member} got tickled by ${message.author.username}`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];

    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/tickle/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.tickleAmount) return console.log('No tickles for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/tickle/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
            .setDescription(`**${die}**`)
            .setFooter({ text:  `${member.user.username} has been tickled ${profileDatas.tickleAmount} times.`})

        message.channel.send({
            embeds: [embed1]})
    }
}
})