/** @format */

const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")
const ms = require("ms")
module.exports = new Command({

	name: "purge",
	description: "delete up to 100 messages at once",
	type: "TEXT",
	cooldown: 3000,
	aliases: ["clear", "clean", "delete", "bulk-del", "bulkdelete", "bulk-delete"],
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: "MANAGE_MESSAGES",

      async run(message, args, client) {

        const noAmount = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle("<:x_:904736839036993586> MISSING ARGUEMENT")
        .setDescription("*Bakaa~* Please provide a valid ``integer / number`` of messages to bulk delete.")
        .setFooter({ text: `Make sure the number is from 1 - 100`, iconURL: `${message.author.displayAvatarURL()}`})

        try {

            let amount = Number(args[1], 10) || parseInt(args[1]);
            if (isNaN(amount) || !Number.isInteger(amount))
              return message.channel.send({embeds: [noAmount]})
            if (!amount || amount < 2 || amount > 100)
              return message.channel.send({embeds: [noAmount]})
            if (!args[2]) {
              try {
                await message.delete();
                await message.channel.bulkDelete(amount).then(async (m) => {
                  const ClearedEmbed = new Discord.MessageEmbed()
                    .setColor("0x#00ffff")
                    .setDescription(
                      `<:tick:904736864076955738>
                      Cleared **${m.size}**/**${amount}** messages!`
                    );
                      
      
                    const msg = await message.channel.send({embeds: [ClearedEmbed]})
                    if (msg) setTimeout(() => msg.delete(), 2000)})
              } catch (e) {
                message.channel.send(
                  `*Bakaa~* You cant delete messages older than 14 days!`
                );
              
              }
            } else {
              return message.channel.send(`An error occoured.`);
            }
          } catch (error) {
            console.log(error);
            message.channel.send(`An error occurred: \`${error}\``);
          }
        },
      })
