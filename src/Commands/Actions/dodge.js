const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
  name: "dodge",
  cooldown: 10000,
  type: "TEXT",
  description: "sends a dodge gif",
  userPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {
    const member = message.mentions.members.first() || message.author

  const schema = require("../../Structures/models/animeProfileData.js");
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
                        DodgeAmount: 1
                    }
                });

                let bites = [
                    `${message.author} dodges ${member} attack.`,
                    `${member} dodges the attack by ${message.author}`,
                    `${message.author} dodges ${member} `,
                   ];            


       const bite = bites[Math.floor(Math.random() * bites.length)];

  if (message.mentions.members.size === 0) {
      fetch(
          `https://kawaii.red/api/gif/dodge/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
    if(!profileDatas.DodgeAmount) return console.log('No dodges for ' + member.user.tag);

      const url = await fetch(`https://kawaii.red/api/gif/dodge/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
      const embed1 = new Discord.MessageEmbed()
      .setImage(`${url.response}?size=1024`)
      .setColor("RANDOM")
      .setFooter({ text: `${message.author} has dodged ${profileDatas.DodgeAmount} attacks.`})
      .setDescription(`**${bite}**`)
      message.channel.send({
          embeds: [embed1]})
  }
}}