const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  
  name: "newvoice",
  description: "Create Voice Channels in your Server",
  type: "TEXT",
	cooldown: 10000,
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
  aliases: ["create-vc", "createvoicechannel", "createvc", "create-voicechannel", "new-vc"],

  async run(message, args, client) {

    const channelNameQuery = args.slice(1).join(" ");
    if(!channelNameQuery) return message.channel.send("Waaa~~ please tell me a name to call this channel OwO")
    message.guild.channels.create(channelNameQuery, {
        type: 'GUILD_VOICE',})    .then(ch => {
            message.channel.send(`${ch} has been made succesfully!`)
        })
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Update!")
      .setDescription(`New voice channel has been made!`)
      .setColor("RANDOM");
    message.channel.send({ embeds: [embed] });
  },
});
