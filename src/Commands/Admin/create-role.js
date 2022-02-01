const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  name: "createrole",
  description: "give a user a role.",
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 10000,
    aliases: ["make-role", "cr-role", "crole", "create-role", "makerole", "crerole"],
  async run(message, args, client) {
    const name = args.slice(1).join(" ");

    if (!args[0]) {
      return message.channel.send("`Usage: create-role <name> `");
    }
    if (!name) {
      return message.channel.send("You need to specify a name for your Role");
    }
    if (name.length > 100) {
      return message.channel.send(
        "Your role can't be more than 100 characters long"
      );
    }
   await message.guild.roles.create({
        name: name,
      })
          const embed = new Discord.MessageEmbed()
      .setTitle(
        `${message.author.username} - (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setColor("RANDOM")
      .setDescription(`
      **Role: ** ${name}
      **Action: ** New Role Created
      **Channel: ** ${message.channel}
      **By: ** ${message.member}
      `);
    message.channel.send({ embeds: [embed] });
  },
});