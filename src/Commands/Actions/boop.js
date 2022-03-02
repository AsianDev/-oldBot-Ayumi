const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
  name: 'boop',
  type: "TEXT",
  cooldown: 10000,
  description: "sends a anime boop gif",
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
                      BoopAmount: 1
                  }
              });




  let kill = [
    `${message.author.username} booped ${member}`,
    `${member} has been booped by ${message.author.username}`,
    `${message.author.username} boops ${member}`,
  ]
  const kills = kill[Math.floor(Math.random() * kill.length)];
  if (message.mentions.members.size === 0) {
      fetch(
          `https://kawaii.red/api/gif/boop/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.BoopAmount) return console.log('No boops for ' + member.user.tag);

      const url = await fetch(`https://kawaii.red/api/gif/boop/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
      const embed1 = new Discord.MessageEmbed()
      .setImage(`${url.response}?size=1024`)
      .setColor("RANDOM")
          .setDescription(`**${kills}**`)
          .setFooter({ text:  `${member.user.username} has been booped ${profileDatas.BoopAmount} times.`})
          message.channel.send({
          embeds: [embed1]})
  }
}}