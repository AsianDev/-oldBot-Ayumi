const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
const Command = require('../../Handlers/Command.js')
const errorX = "<:Ikix:904736839036993586>"

module.exports = new Command({
    name: "steal",
    aliases: ["steal-emoji", "add-emoji"],
    description: "Add an emoji by using a command",
    userPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
    botPermissions: ["SEND_MESSAGES"],
    type: "TEXT",
    cooldown: 7000,

    async run(message, args, client) {

    const emoji = args[1];
    const name = args.slice(2).join(" ");
    if (!emoji) {
      const embed = new MessageEmbed()
      .setColor("#FCC8EA")
      .setDescription("*Waa~* Please provide an emoji!")
      .setTitle(`${errorX} MISSING ARGUEMENT`)  
      return message.channel.send({embeds: [embed]})
    }

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed1 = new MessageEmbed()
          .setTitle(`Emoji Added`)
          .setThumbnail(`${emoji}`)
          .setColor('#FF69B4')
          .setDescription(
            `Emoji Has Been Added! | Name: ${
              name || "give_name"
            } `
          );
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
          .setTitle(`Emoji Added <:${customEmoji.name}:${customEmoji.id}>`)
          .setColor('#FF69B4')
          .setThumbnail(`${link}`)
          .setDescription(
            `Emoji Has Been Added! | Name: ${
              name || `${customEmoji.name}`
            } | Preview: **[Click me](${link})**`
          );
        return message.channel.send({embeds: [embed6]});
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[1]) {
           const errorX = "<:Ikix:904736839036993586>"

           const embed2 = new MessageEmbed()
           .setColor("#FCC8EA")
           .setDescription("*Waa~* Please provide an emoji!")
           .setTitle(`${errorX} MISSING ARGUEMENT`)             
          return message.channel.send({embeds: [embed2]});
        }
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached (50)"
        )
      ) {
         const embed4 = new MessageEmbed()
               .setDescription(`Maximum emoji count reached for this Server!`)
               .setColor('RANDOM')
        
        return message.channel.send({embeds: [embed4]})
      }
    }
  }
})