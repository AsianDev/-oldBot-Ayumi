const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  name: "removerole",
  description: "give a user a role.",
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
 type: "Text",
    cooldown: 4000,
    aliases: ["take-role", "r-role", "rrole", "remove-role", "rerole"],
  async run(message, args, client) {
    const user = message.mentions.members.first();
    if (!user)
      return message.channel.send(
        "*Bakaa~~* mention a user for me to remove a role from!"
      );
    const role = message.mentions.roles.first();
    if (!role) return message.channel.send("Waaa~~ please name the role!");
    await user.roles.remove(role)
    const embed = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setDescription(`${user} now has been removed of the ${role} role`);
    message.channel.send({ embeds: [embed] });
  },
});

