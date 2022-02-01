const Discord = require("discord.js");

module.exports = {
  name: "unlock",
  description: "unlocks a Channel",
  type: "TEXT",
  cooldown: 10000,
  aliases: ["un-lock"],
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["ADMINISTRATOR"],
    async run(message, args, client) {
    message.channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: null});
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔓 ${message.channel}  has been Unlocked`)
      .setColor("RANDOM")
      .setFooter({ text: "Kaori©"})
    await message.channel.send({ embeds: [embed] });
    message.delete();
  },
};