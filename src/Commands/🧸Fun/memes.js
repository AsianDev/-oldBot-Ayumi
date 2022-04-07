const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const axios = require('axios')
const got = require('got')
module.exports = new Command({
    name: "meme",
    description: "sends a random meme",
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 aliases: ["memes"],
    cooldown: 5000,

    async run(message, args, client) {
        const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
        .setLabel("Next meme")
        .setEmoji("⏯️")
        .setStyle("PRIMARY")
        .setCustomId("meme")
      )
      .addComponents(
        new Discord.MessageButton()
        .setLabel("End")
        .setEmoji("🛑")
        .setStyle("DANGER")
        .setCustomId("End-inter")
      )


       got(`https://www.reddit.com/r/animememes/random/.json`).then( async response => {  

         const content = JSON.parse(response.body)
       const permanentlink = content[0].data.children[0].data.permanentlink
        const memeURl = `https://www.reddit.com${permanentlink}`
        const memeImage = content[0].data.children[0].data.url
        const memeTitle = content[0].data.children[0].data.title
        const memeUpvotes = content[0].data.children[0].data.ups

        const embed = new Discord.MessageEmbed()
        embed.setTitle(`${memeTitle}`)
        .setTimestamp()
        .setURL(`${memeURl}`)
        .setColor("#36393f")
        .setFooter({text: `👍${memeUpvotes}`})
        .setImage(`${memeImage}`)
         const MESSAGE = await message.channel.send({ embeds: [embed], components: [row]});
                
      const collector = MESSAGE.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async b => {
          if(b.customId === "meme") {
            got(`https://www.reddit.com/r/animememes/random/.json`).then( async response => {  

         const content = JSON.parse(response.body)
       const permanentlink = content[0].data.children[0].data.permanentlink
        const memeURl = `https://www.reddit.com${permanentlink}`
        const memeImage = content[0].data.children[0].data.url
        const memeTitle = content[0].data.children[0].data.title
        const memeUpvotes = content[0].data.children[0].data.ups

        const embed = new Discord.MessageEmbed()
      embed.setTitle(`${memeTitle}`)
        .setTimestamp()
        .setURL(`${memeURl}`)
        .setColor("BLUE")
        .setFooter({text: `👍${memeUpvotes}`})
        .setImage(`${memeImage}`)

        b.update({ embeds: [embed], components: [row]})
            } )
                } else if(b.customId === "End-inter") {
                  MESSAGE.delete()
                }
                })
      })
    }})