const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
name: 'lick',

cooldown: 10000,
description: "sends an anime gif of licking",
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
                        LickAmount: 1
                    }
                });

                let bites = [
                    `${member} was licked by ${message.author}`,
                    `${member} has been licked by ${message.author}`,
                    `${message.author} licks ${member} `,
                    `${member} has been licked`,
                   ];            


       const Lick = bites[Math.floor(Math.random() * bites.length)];

    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/lick/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.LaughAmount) return console.log('No licks for ' + member.user.tag);


        const url = await fetch(`https://kawaii.red/api/gif/lick/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`**${Lick}**`)
        .setFooter({ text
:  `${member.user.username} has been licked ${profileDatas.LickAmount} times.`})

        message.channel.send({
            embeds: [embed1]})
    }
}
})