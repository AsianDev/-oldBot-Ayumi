const Discord = require("discord.js");

module.exports = {
  name: "unlock",
  description: "unlocks a Channel",
  type: "Text",
    cooldown: 4000,  aliases: ["un-lock"],
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: "MANAGE_CHANNELS",
    async run(message, args, client) {
    message.channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: null});
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔓 ${message.channel}  has been Unlocked`)
      .setColor("RANDOM")
      .setFooter({ text
: "Ayumi©"})
    await message.channel.send({ embeds: [embed] });
    message.delete();
  },
};