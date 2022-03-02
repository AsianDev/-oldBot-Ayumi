const fetch = require("node-fetch")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    
name: "cuddle",
type: "TEXT",
cooldown: 10000,
description: "sends a anime gif of you cuddling someone!",
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
                     CuddleAmount: 1
                  }
              });

              let bites = [
                  `${member} was hugged by ${message.author}`,
                  `${member} has been hugged by ${message.author}`,
                  `${message.author} cuddles ${member} `,
                  `${member} has been cuddled`,
                 ];            


     const bite = bites[Math.floor(Math.random() * bites.length)];



    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/cuddle/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.CuddleAmount) return console.log('No cuddles for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/cuddle/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
        .setDescription(`**${bite}**`)
        .setFooter({ text: `${member.user.username} has been cuddles ${profileDatas.CuddleAmount} times.` })
        message.channel.send({
            embeds: [embed1]})
    }
}
})