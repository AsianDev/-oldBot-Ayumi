const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
    
name: "slap",

cooldown: 10000,
description: "sends a slap anime gif",
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
                      SlapAmount: 1
                  }
              });


    let dies = [
      `${message.author.username} slaped ${member}`,
      `${member} has been slapped by ${message.author.username}`,
      `${member} has been slapped`,
      `${message.author.username} slaps ${member}`,
      `${member} got slapped by ${message.author.username}`,
  
     ];
     const die = dies[Math.floor(Math.random() * dies.length)];
  
      if (message.mentions.members.size === 0) {
          fetch(
              `https://kawaii.red/api/gif/slap/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.SlapAmount) return console.log('No slaps for ' + member.user.tag);

          const url = await fetch(`https://kawaii.red/api/gif/slap/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
          const embed1 = new Discord.MessageEmbed()
          .setImage(`${url.response}?size=1024`)
          .setColor("RANDOM")
              .setDescription(`**${die}**`)
              .setFooter({ text
:  `${member.user.username} has been slapped ${profileDatas.SlapAmount} times.`})
          message.channel.send({
              embeds: [embed1]})
      }
  }
  })