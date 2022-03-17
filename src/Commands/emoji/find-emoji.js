const Discord = require("discord.js");
const fetch = require("node-fetch");
const Command = require('../../Structures/Handlers/Command.js')
const c = require("../../config/assets/Json/colours.json")
const e = require("../../config/assets/Json/emotes.json")

module.exports = new Command({  
    name: "findemoji",
  aliases: ["finde"],
  description: "Steals Emoji from Other Servers to ur Server.",
  type: 'TEXT',
  userPermissions: "",
  owner: true,
  botPermissions: "SEND_MESSAGES",
  cooldown: 4000,
  aliases: ["findemoji", "find-emoji", "emojifind"],

  async run(message, args, client) {

    let pages = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("BACK")
        .setCustomId("previous"),
      new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("NEXT")
        .setCustomId("next"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("ADD")
        .setCustomId("add"),
      new Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("CANCEL")
        .setCustomId("cancel")
    );
    let emojis = await fetch("https://emoji.gg/api/").then(res => res.json());
    const q = args.slice(1).join(" ")
    let matches = emojis.filter(s => s.title == q || s.title.includes(q));

    let noResult = new Discord.MessageEmbed()
      .setDescription(`*Waaa~* No Results found for ${args.slice(1).join(" ")}!\nPlease give me a catergory query!`)
      .setTitle(`${e.Error} MISSING ARGUEMENT`)
      .setColor(c["pale red"]);

    let page = 0;
    let i0 = 0;
    let i1 = 10;

    if (!matches.length) return message.channel.send({ embeds: [noResult] });
    let embed = new Discord.MessageEmbed()
      .setTitle(matches[page].title)
      .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
      .setColor(c["celestial blue"])
      .setImage(matches[page].image)
      .setFooter({ text: `Emoji ${page + 1}/${matches.length}`});
      let msg = await message.channel.send({
      embeds: [embed],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        if (i1 < 9) return msg.delete();
        let embed = new Discord.MessageEmbed()
          .setTitle(matches[page].title)
          .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
          .setColor(c["celestial blue"])
          .setImage(matches[page].image)
          .setFooter({ text: `Emoji ${page + 1}/${matches.length}`});

        msg.edit({ embeds: [embed] });
      }
      if (i.customId === "next") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > matches.length + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();
        let embed = new Discord.MessageEmbed()
          .setTitle(matches[page].title)
          .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
          .setColor(c["celestial blue"])
          .setImage(matches[page].image)
          .setFooter({ text: `Emoji ${page + 1}/${matches.length}`});

        msg.edit({ embeds: [embed] });
      }
      if (i.customId === "add") {
        const res = matches[page];
        let created;
        try {
          created = await message.guild.emojis.create(res.image, res.title);
        } catch {
          message.channel.send(`Unable to add ${res.title}.`, { message });
        }
        let embed = new Discord.MessageEmbed()
          .setColor(c.pink)
          .setDescription(`<:Iki_tick:904736864076955738> **Enlarged Emoji!**\n<:Kao_ReplyCont:940971017826893844> Emoji name: \`${created.name}\`\n <:Kao_ReplyCont:940971017826893844> Emoji link: [Click here](${created.url})\n <:Kao_Reply:940971041621180437> Emoji Id: \`${created.id}\``)    
          .setThumbnail(`${created.url}`)
          .setTimestamp()


        msg.edit({ embeds: [embed], components: [] });
      }
      if (i.customId === "cancel") {
        msg.delete();
        return message.reply("Cancelled command.", { message });
      }
    });
    collector.on("end", async i => {
        let embed = new Discord.MessageEmbed()
         .setTitle(matches[page].title)
         .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
         .setColor(c.pink)
         .setImage(matches[page].image)
         .setFooter({ text: `Emoji ${page + 1}/${matches.length}`});
         pages.components[0].setDisabled(true);
         pages.components[1].setDisabled(true);
         pages.components[2].setDisabled(true);
         msg.edit({ embeds: [embed], components: [pages] });
       });
  }
})