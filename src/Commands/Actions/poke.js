const Command = require('../../Handlers/Command.js')
const fetch = require("node-fetch")
const Discord = require('discord.js')

module.exports = new Command({
    
name: "poke",
type: "TEXT",
description: "sends a anime poking gif",
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
                      PokeAmount: 1
                  }
              });




  let dies = [
    `${message.author.username} pokes ${member}`,
    `${member} has been poked by ${message.author.username}`,
    `${member} has been poked ;-;`,
    `${message.author.username} poked ${member}`,
    `${member} got poked by ${message.author.username}`,

   ];
   const die = dies[Math.floor(Math.random() * dies.length)];

    if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/poke/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
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
        if(!profileDatas.PokeAmount) return console.log('No pokes for ' + member.user.tag);

        const url = await fetch(`https://kawaii.red/api/gif/poke/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
        const embed1 = new Discord.MessageEmbed()
        .setImage(`${url.response}?size=1024`)
        .setColor("RANDOM")
            .setDescription(`**${die}**`)
            .setFooter({ text: `${member.user.username} has been poked ${profileDatas.PokeAmount} times.`})
        message.channel.send({
            embeds: [embed1]})
    }
}
})