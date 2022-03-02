const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
const Command = require('../../Handlers/Command.js')
const errorX = "<:Ikix:904736839036993586>"
const c = require("../../config/assets/Json/colours.json")
const e = require("../../config/assets/Json/emotes.json")


module.exports = new Command({
    name: "steal",
    aliases: ["steal-emoji", "add-emoji"],
    description: "Add an emoji by using a command",
    userPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
    botPermissions: "MANAGE_EMOJIS_AND_STICKERS",
    type: "TEXT",
    cooldown: 7000,

    async run(message, args, client) {

    const emoji = args[1];
    const name = args.slice(2).join(" ");
    if (!emoji) {
      const embed = new MessageEmbed()
      .setColor(c["light red"])
      .setDescription("*Waa~* Please provide an emoji!")
      .setTitle(`${errorX} MISSING ARGUEMENT`)  
      return message.channel.send({embeds: [embed]})
    }

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed1 = new MessageEmbed()
        .setColor(c.pink)
        .setThumbnail(`${emoji.url}`)
        .setTimestamp()
        .setDescription(`<:Iki_tick:904736864076955738> **Added Emoji!**\n<:Kao_ReplyCont:940971017826893844> Emoji name: \`${emoji.name}\`\n <:Kao_ReplyCont:940971017826893844> Emoji link: [Click here](${emoji.url})\n <:Kao_Reply:940971041621180437> Emoji Id: \`${emoji.id}\``)    
        return message.channel.send({embeds: [embed1]});
      }

      const customEmoji = Util.parseEmoji(emoji); 

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }` ;

        await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`
        );
       
        const embed6 = new MessageEmbed()
          .setColor(c.pink)
          .setThumbnail(`${link}`)
          .setTimestamp()
          .setDescription(`<:Iki_tick:904736864076955738> **Added Emoji!**\n<:Kao_ReplyCont:940971017826893844> Emoji name: \`${ name || customEmoji.name}\`\n <:Kao_ReplyCont:940971017826893844> Emoji link: [Click here](${link})\n <:Kao_Reply:940971041621180437> Emoji Id: \`${customEmoji.id}\``)    
          return message.channel.send({embeds: [embed6]});
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[1]) {
           const errorX = "<:Ikix:904736839036993586>"

           const embed2 = new MessageEmbed()
           .setColor(c["light red"])
           .setDescription("*Waa~* Please provide an emoji!")
           .setTitle(`${errorX} MISSING ARGUEMENT`)             
          return message.channel.send({embeds: [embed2]});
        }
      }
    } catch (e) {
         const embed4 = new MessageEmbed()
               .setDescription(`An error occured while running this command:`)
                .addField("Error:", `${e}`)
                 .setTitle(`${errorX} AN ERROR OCCURED `)
               .setColor(c["light red"])
               console.log(e)
        
        return message.channel.send({embeds: [embed4]})
    }
  }
})