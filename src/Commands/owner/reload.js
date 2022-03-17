const Discord = require('discord.js');
const Command = require('../../Structures/Handlers/Command.js')
const glob = require("glob");

module.exports = new Command({
    name: "reload",
    description: "reload all commands at once",
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        const Reload = client.channels.cache.get('925997925925011466');

        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return console.log(err)
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);

                if (pull.name) {
                    client.commands.set(pull.name, pull);
                }
                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((aliases) => {
                        client.aliases.set(aliases, pull.name)
                    })
                }

            })
            const embed = new Discord.MessageEmbed()
                .setColor("#FCC8EA")
                .setDescription(`◦○˚ ୧ Reloaded a total of \`${client.commands.size}\` Commands. ୭ ˚○`)
            message.channel.send({ embeds: [embed] })
            const reloadedconfirmed = new Discord.MessageEmbed()
            .setColor("#4D9AE6")
            .setTitle(`${client.user.tag}'s commands has been reloaded.`)
            .setDescription(`A total of \`${client.commands.size}\` Commands has been reloaded by ${message.author}`)
            .setTimestamp()

            Reload.send({embeds: [reloadedconfirmed]})
        })
    }
})