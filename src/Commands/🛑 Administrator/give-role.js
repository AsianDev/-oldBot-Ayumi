const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
      name: "giverole",
      description: "give a user a role.",
      userPermissions: ["ADMINISTRATOR"],
      botPermissions: ["ADMINISTRATOR"],
      type: "Text",
      cooldown: 7000,
      aliases: ["give-role", "g-role", "grole", "add-role", "addrole", "adrole"],

  async run(message, args, client) {

    const user = message.mentions.members.first();
    if (!user)
      return message.channel.send(
        "*Bakaa~* mention a user for me to give a role to!"
      );
    const name = args.slice(1).join(" ");
    if (!name) return message.channel.send("*Waa~* please name the role!");
    const role = message.mentions.roles.first();
    if (!role) return message.channel.send("I could not find the mentioned role \n Please try again later.");
    await user.roles.add(role)
    
    const success = new Discord.MessageEmbed()
      .setColor("WHITE")
      .setDescription(`${user} now has been given the ${role} role`);
      message.channel.send({ embeds: [success] });
  
    },
});