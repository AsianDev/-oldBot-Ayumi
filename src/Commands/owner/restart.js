const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "restart",
    description: "reload all commands at once",
    owner: true,
type: "Text",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        await message.channel.send(` **Bot restarted...**\n• Loaded \`${client.commands.size}\` commands`);

        const restart = new Discord.MessageEmbed()
            .setColor("#4D9AE6")
            .setDescription(`**Restarted by ${message.author}**`)
            .setTitle(`${client.user.tag} has restarted`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setFooter({ text
: "Please start the bot again", iconURL: `${client.user.displayAvatarURL()}`})
            .setTimestamp()

        const Restart = client.channels.cache.get('925997925925011466');
        if (Restart) {
            await Restart.send({ embeds: [restart] });
        }
        return process.exit()

    }
})