const Command = require('../../Handlers/Command.js')
const { MessageEmbed } = require("discord.js")
const colour = require('../../config/assets/Json/colours.json')
module.exports = new Command({
    name: 'slowmode',
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    type: 'Text',
    description: "gives custom slowmode!",
    aliases: ["sm", "slow", "chat-slower"],
    async run(message, args, client) {

        const SlowmodeNumber = args[1]
        if(!SlowmodeNumber) return client.errorEmbed(message, `*Waa~* please state a number to set as the slowmode!`)
        if(isNaN(SlowmodeNumber)) {
            return client.errorEmbed(message, `*Waa~* please state a __number__ to set as the slowmode!`)
         } else {
            message.channel.setRateLimitPerUser(SlowmodeNumber);
           return message.channel.send({ embeds: [ new MessageEmbed()
            .setColor(colour.pink)
            .setDescription(`*Teehee* set the slowmode to: ${SlowmodeNumber} seconds`)
        ]});
        }
    }
});