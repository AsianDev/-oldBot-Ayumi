const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
  name: 'punch',
  description: "sends a anime punching gif",
  botPermissions: 'SEND_MESSAGES',
  type: "Text",
    cooldown: 4000,  userPermissions: ["SEND_MESSAGES"],
  aliases: ["hit"],
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
                      PunchAmount: 1
                  }
              });



  let dies = [
    `${message.author} punches ${member}`,
    `${member} has been punched by ${message.author}`,
    `${member} has been punched.. Ouch`,
    `${message.author.username} punched ${member}`,
    `${member} got punched by ${message.author}.. that mustve hurt huh`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];

    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/punch/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
        if(!profileDatas.PunchAmount) return console.log('No punch for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/punch/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
            .setDescription(`**${die}**`)
            .setFooter({ text
: `${member.user.username} has been punched ${profileDatas.PunchAmount} times`})
        message.channel.send({
            embeds: [embed1]})
    }
}})