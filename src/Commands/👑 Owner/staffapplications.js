const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const colour = require("../../config/assets/Json/colours.json")
module.exports = new Command ({
    name: 'google-form-apply',
    description: "apply for staff",
type: "Text",
    userPermissions: "MANAGE_MESSAGES",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {    

        const Staffembed = new Discord.MessageEmbed()
        .setColor(`${colour.purple}`)
        .setTitle("Looking for new Staff")
        .setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
        .setTimestamp()
        .setFooter({ text
: "I~... I~.. I Hope to see you pass!", iconURL: `${message.author.displayAvatarURL()}`})
        .setDescription(`**Come and apply for a chat moderator**\nHave a chance to become a moderator at **Ikigai**\n${message.author.username} Here are the forms:`)
        .addField("Application link?", `**__[Press Me!](https://forms.gle/Qw5PsVNBU974jvke7)__**`)

        const StaffButton = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setStyle("LINK")
            .setURL("https://forms.gle/Qw5PsVNBU974jvke7")
            .setLabel("If that didnt work press this!")
            .setEmoji("<:Iki_Mod:904219716195868752>")
        )

        message.channel.send({embeds: [Staffembed], components: [StaffButton]})

        }})