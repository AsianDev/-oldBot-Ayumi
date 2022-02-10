const { MessageEmbed } = require("discord.js");
const Command = require('../../Handlers/Command.js')
const ms = require("ms")

module.exports = new Command({
        name: "coinflip",
        description: "test your luck with a flip",
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: "SEND_MESSAGES",
        type: "TEXT",
        cooldown: 5000,
        aliases: ["cflip", "flipcoin", "coinglip", "coingflip"],
    async run(message, args, client) {

        const choices = ["Heads", "Tails"];
        const choice = choices[Math.floor(Math.random() * choices.length)];

        const flipped = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**<@${message.author.id}> flips a coin <a:coing:935239919281012806>**`)
        message.reply({ embeds: [flipped], allowedMentions: {repliedUser: false} }).then((msg) => {
            setTimeout(() => msg.edit({ embeds: [flips] }), ms('2 seconds'))
        })
        let flips = new MessageEmbed()
        .setColor("#FCAEEB")
        .setTitle(`${message.author.username} has flipped a coin!`)
        .setThumbnail("https://media.discordapp.net/attachments/934515089296486430/935239841002704957/2253-sonic-coin-spin.gif?width=102&height=102")
        .setDescription(`${message.author.tag} has flipped a || **${choice}** ||`)
    }
})
