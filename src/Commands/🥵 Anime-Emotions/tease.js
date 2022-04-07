const Discord = require("discord.js");
const { soyultro } = require("soyultro");
let teaseGifs = soyultro("tease");

module.exports = {
    name: 'tease',
    
    cooldown: 10000,
    description: "sends a anime teasing gif",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: 'SEND_MESSAGES',
type: "Text",
    async run(message, args, client) {

    const Target = message.mentions.users.first()

    if(!Target) return message.reply('🚫 | Wrong arguments! Please tag someone!');
    

    const embed = new Discord.MessageEmbed()
    .setColor("LUMINOUS_VIVID_PINK")
    .setTitle(`${message.author.username} is teasing ${Target.username}`)
    .setImage(teaseGifs);
    message.channel.send({ embeds: [embed]})
},
};