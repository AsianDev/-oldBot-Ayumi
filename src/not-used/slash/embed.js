// const Discord = require("discord.js");
// const Command = require('../../Handlers/Command.js')

// module.exports = new Command ({ 
//      name: "embed",
//   description: "create a embed a command in a certain channel.",
//   type: "SLASH",
//   permission: "MANAGE_CHANNELS",
//   slashCommandOptions: [
//     {
//       type: "CHANNEL",
//       name: "channel",
//       description: "What channel do you want your embed to be in?",
//       required: true
//     },
//     {
//       type: "STRING",
//       name: "title",
//       description: "What title do you want for the embed?",
//       required: true
//     },
//     {
//       type: "STRING",
//       name: "color",
//       description: "Please select a colour for this embed",
//       required: true,
//       choices: [
//         {
//           name: "Random",
//           value: "RANDOM"
//         },
//         {
//           name: "Red",
//           value: "RED"
//         },
//         {
//           name: "Aqua",
//           value: "AQUA"
//         },
//         {
//           name: "Dark Aqua",
//           value: "DARK_AQUA"
//         },
//         {
//           name: "Green",
//           value: "GREEN"
//         },
//         {
//           name: "Dark Green",
//           value: "DARK_GREEN"
//         },
//         {
//           name: "Blue",
//           value: "BLUE"
//         },
//         {
//           name: "Dark Blue",
//           value: "DARK_BLUE"
//         },
//         {
//           name: "Purple",
//           value: "PURPLE"
//         },
//         {
//           name: "Dark Purple",
//           value: "DARK_PURPLE"
//         },
//         {
//           name: "Luminous Vivid Pink",
//           value: "LUMINOUS_VIVID_PINK"
//         },
//         {
//           name: "Dark Vivid Pink",
//           value: "DARK_VIVID_PINK"
//         },
//         {
//           name: "Gold",
//           value: "GOLD"
//         },
//         {
//           name: "Dark Gold",
//           value: "DARK_GOLD"
//         },
//         {
//           name: "Orange",
//           value: "ORANGE"
//         },
//         {
//           name: "Dark Orange",
//           value: "DARK_ORANGE"
//         },
//         {
//           name: "Dark Red",
//           value: "DARK_RED"
//         },
//         {
//           name: "Grey",
//           value: "GREY"
//         },
//         {
//           name: "Dark Grey",
//           value: "DARK_GREY"
//         },
//         {
//           name: "Darker Grey",
//           value: "DARKER_GREY"
//         },
//         {
//           name: "Light Grey",
//           value: "LIGHT_GREY"
//         },
//         {
//           name: "Navy",
//           value: "NAVY"
//         },
//         {
//           name: "Dark Navy",
//           value: "DARK_NAVY"
//         },
//         {
//           name: "Yellow",
//           value: "YELLOW"
//         },
//         {
//           name: "White",
//           value: "WHITE"
//         }
//       ]
//     },
//     {
//       type: "STRING",
//       name: "description",
//       description: "What do you want the description of this embed to be?",
//       required: true
//     },
//     {
//       type: "STRING",
//       name: "footer",
//       description: "What would you like the embed's footer to say?",
//       required: true
//     },
//     {
//       type: "STRING",
//       name: "timestamp",
//       description:
//         "Do you want a timestamp? Type \\`yes\\` if you do, and type \\`no\\` if you don't.",
//       required: true,
//       choices: [
//         {
//           name: "Yes",
//           value: "yes"
//         },
//         {
//           name: "No",
//           value: "no"
//         }
//       ]
//     },
//     {
//       type: "STRING",
//       name: "thumbnails",
//       description: "Now you use the thumbnails otherwise just leave it",
//       required: false
//     },
//     {
//       type: "STRING",
//       name: "image",
//       description: "Now you use the image otherwise just leave it",
//       required: false,
//     }
//   ],
//   async run(interaction, args, client) {

//     const title = interaction.options.getString("title");
//     const channel = interaction.options.getChannel("channel");
//     const description = interaction.options.getString("description");
//     const color = interaction.options.getString("color");
//     const footer = interaction.options.getString("footer");
//     const timesm = interaction.options.getString("timestamp");
//     const image = interaction.options.getString("image");
//     const thumbnails = interaction.options.getString("thumbnails");

//     if (timesm === "yes") {
//       await interaction.followUp({
//         ephemeral: true,
//         embeds: [
//           new Discord.MessageEmbed()
//             .setColor("RANDOM")
//             .setTitle(`DONE!`)
//             .setDescription(
//               ` The embed has been sent in <#${channel.id}>.`
//             )
//             .setFooter({ text: "Time stamp is enabled"})
//         ]
//       });

//       const embed2 = new Discord.MessageEmbed()
//         .setTitle(title)
//         .setColor(color)
//         .setDescription(description)
//         .setFooter({ text: footer})
//         .setImage(image)
//         .setThumbnail(thumbnails)
//         .setTimestamp();
//       interaction.guild.channels.cache
//         .get(channel.id)
//         .send({ embeds: [embed2] });
//     } else if (timesm === "no") {
//       await interaction.followUp({
//         ephemeral: true,
//         embeds: [
//           new Discord.MessageEmbed()
//             .setColor("RANDOM")
//             .setTitle(`DONE!`)
//             .setDescription(
//               ` The embed has been sent in <#${channel.id}>.`
//             )
//             .setFooter({ text: "Time stamp is disabled"})
//         ]
//       });
//       const embed = new Discord.MessageEmbed()
//         .setTitle(title)
//         .setColor(color)
//         .setDescription(description)
//         .setImage(image)
//         .setThumbnail(thumbnails)
//         .setFooter({ text: footer});
//       interaction.guild.channels.cache
//         .get(channel.id)
//         .send({ embeds: [embed] });
//     }
//   }
// })