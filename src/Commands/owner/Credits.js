const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
    name: 'credits',
    description: "Shows credited ppl for Ikigai",
    aliases: ["credit"],
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],


    async run(message, args, client) {

        const CreditsEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Here are the people who have helped develep small parts of Kaori big thanks to them.\n\n make sure to check out their bots.")
            .addField("Senpai#2473:", "Senpai has given inspiration to some commands and also given cod to some of his commands big thanks to him.")
            .addField("Solar#3593", "Solar has helped me with errors to fixa Kaori at times and has gave code to his autorole system. big thanks again.")
            .addField("BDT#4248 ", "BDT has helped me with errors to fixa Kaori at times and has helped me from the beginning big thanks again.")

        const CreditButton = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("923885709369167872")
                    .setLabel("Invite Neox bot")
                    .setStyle("LINK")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=799993389210140672&permissions=8&scope=bot%20applications.commands")
            )
            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("923885709369167872")
                    .setLabel("Invite fusion.js")
                    .setStyle("LINK")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=900598898144468992&permissions=433728121974&scope=bot%20applications.commands")
            )
            .addComponents(
                new Discord.MessageButton()
                    .setEmoji("923885709369167872")
                    .setLabel("Join skulldragon kingdom")
                    .setStyle("LINK")
                    .setURL("https://discord.gg/Mm6Gb5d")
            )

        message.channel.send({ embeds: [CreditsEmbed], components: [CreditButton] })
    }
})