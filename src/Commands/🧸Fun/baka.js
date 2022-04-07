const fetch = require("node-fetch");
const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
        name: "baka",
        description: "baka someone",
        userPermissions: ["SEND_MESSAGES"],
      botPermissions: "SEND_MESSAGES",
      type: "Text",    
        cooldown: 5000,
        aliases: ["bak", "stupid"],
        
    async run(message, args, client) {
      if (message.mentions.members.size === 0) {
        fetch(
            `https://kawaii.red/api/gif/baka/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
            .then(res => res.json()
                .then(url => {
                    const embed = new Discord.MessageEmbed()
                    .setImage(`${url.response}?size=1024`)
                    .setColor("RANDOM")
                    message.channel.send({ embeds: [embed] })
                }))
    }
}
})