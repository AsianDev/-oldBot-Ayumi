const Discord = require("discord.js");
const { soyultro } = require("soyultro");
let thumbsupGifs = soyultro("thumbsup");

module.exports = {
    name: 'thumbsup',
    
    aliases: ["thumb-up", "thumb", "thup"],
    cooldown: 10000,
    description: "sends a anime thumbsup gif",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: 'SEND_MESSAGES',
type: "Text",
    async run(message, args, client) {
    
    const embed = new Discord.MessageEmbed()
    .setColor("LUMINOUS_VIVID_PINK")
    .setImage(thumbsupGifs);
    message.channel.send({ embeds: [embed]})
},
};