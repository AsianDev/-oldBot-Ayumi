const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
name: 'kill',
type: "TEXT",
description: "kill someone with anime gif.",
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
                      KillAmount: 1
                  }
              });


    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/kill/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} no... you dont have to...`)
                        .setImage(`${url.response}?size=1024`)
                        .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }

    else if (message.mentions.members.size !== 0) {

      let kill = [
        `${message.author} killed ${member}`,
        `${message.author} murdered ${member}`,
        `${message.author} is killing ${member}`,
      ]
      const kills = kill[Math.floor(Math.random() * kill.length)];

      
    const profileDatas = await schema.findOne({ userID: member.id });
    if(!profileDatas.KillAmount) return console.log('No kills for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/kill/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
            .setDescription(`**${kills}**`)
            .setFooter({ text:  `${member.user.username} has been Killed ${profileDatas.KillAmount} times.`})
        message.channel.send({
            embeds: [embed1]})
    }
}
})