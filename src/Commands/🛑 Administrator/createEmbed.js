const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command ({
    name: "embed",
    userPermissions: ["ADMINISTRATOR"],
  botPermissions: "SEND_MESSAGES",
  cooldown: 70000,
  type: "Text",
    aliases: ["esay", "announce"],
    description: "creates an embed",
    async run(message, args, client) {
      
    let title;
    // let color;
    let desc;
    let image;
    // let thumbnail;
    // let footer; 
    // this will be commented 

    // You can comment out what you dont want

    const channel = message.mentions.channels.first() || message.channel;

    let filter = (i) => i.author.id === message.author.id;

    const TitleName = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Waaa~* What will be the title of the embed?")

   await message.channel.send({embeds: [TitleName]}).then(async (msg) => {
      try {
        await msg.channel
          .awaitMessages({ filter: filter, max: 1 })
          .then(async (val) => {
            title = val.first().content;
          });
      } catch (e) {}
    });

    // await message.channel.send(`What's gonna be the color?\n\n **Example:** DARK_RED or #BF3320`).then(async (msg) => {
    //   try {
    //     await msg.channel
    //       .awaitMessages({ filter: filter, max: 1 })
    //       .then(async (val) => {
    //         color = val.first().content;
    //       });
    //   } catch (e) {}
    // });

    const descriptionName = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Waaa~* What will be the description of the embed?")

    await message.channel.send({embeds: [descriptionName]}).then(async (msg) => {
      try {
          await msg.channel
            .awaitMessages({ filter: filter, max: 1 })
            .then(async (val) => {
              desc = val.first().content;
            });
        } catch (e) {}
      });

    const ImageLink = new Discord.MessageEmbed()
    .setColor("#FCC8EA")
    .setDescription("*Waaa~* What will be the image of the embed?")
    .setFooter({ text
: "Remember to send a link for this image not an attachment" })

   await message.channel.send({embeds: [ImageLink]}).then(async (msg) => {
        try {
        await msg.channel
          .awaitMessages({ filter: filter, max: 1 })
          .then(async (val) => {
            image = val.first().content;
          });
      } catch (e) {}
    });

    // await message.channel.send(`What's gonna be the thumbnail? Make sure its a link `).then(async (msg) => {
    //   try {
    //     await msg.channel
    //       .awaitMessages({ filter: filter, max: 1 })
    //       .then(async (val) => {
    //         thumbnail = val.first().content;
    //       });
    //   } catch (e) {}
    // });

    // await message.channel.send(`What will be the footer of this embed?`).then(async (msg) => {
    //   try {
    //     await msg.channel
    //       .awaitMessages({ filter: filter, max: 1 })
    //       .then(async (val) => {
    //         footer = val.first().content;
    //       });
    //   } catch (e) {}
    // });

    const CustomEmbed = new Discord.MessageEmbed()
      .setTitle(title)
      .setColor("#FCC8EA")
      .setDescription(desc)
      .setImage(image)
      .setTimestamp()
      // .setThumbnail(thumbnail)
      // .setFooter({text: footer})

      const SentEmbed = new Discord.MessageEmbed()
      .setTitle("Successfully sent!")
      .setDescription(`The embed has been sent to ${channel} succesfully!`)
      .setColor("#FCC8EA")
      message.channel.send({embeds: [SentEmbed]})
    channel.send({ embeds: [CustomEmbed] });
  },
})