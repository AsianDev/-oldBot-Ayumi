const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
        name: "clyde",
        description: "let clyde say something",
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: ["ADMINISTRATOR"],
        type: "TEXT",
        cooldown: 5000,
        async run(message, args, client) {
    const text = args.slice(1).join(" ");
    if (!text) return message.channel.send("*Waa~* what is clyde going to say?", {message});
    const sendMsg = await message.channel.send("⚙ Processing Image..", {message});
    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then(res => res.json());
    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter({text: message.author.username})
      .setColor("BLUE")
      .setImage(`${data.message}?size=1024`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
})