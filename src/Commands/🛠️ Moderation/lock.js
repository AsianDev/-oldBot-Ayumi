const Discord = require("discord.js");

module.exports = {
  name: "lock",
  description: "Locks a Channel",
  type: "Text",
  aliases: ["lock-channel"],
    cooldown: 4000,  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: "MANAGE_CHANNELS",

    async run(message, args, client) {
    message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false });
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔒 ${message.channel} has been Locked`)
      .setColor("RANDOM")
      await message.channel.send({ embeds: [embed] });
    message.delete();

  },
  
};