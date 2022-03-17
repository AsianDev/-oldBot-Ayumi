const fetch = require("node-fetch");
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
module.exports = new Command({
    name: "webss",
    description: "Get a screenshot of a website",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    aliases: ["sc", "screenshot"],
    type: "TEXT",
    cooldown: 5000,
    async run(message, args, client) {
    
        const noLink = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("<:x_:904736839036993586> Missing arguement")
        .setDescription("*Waaa~* please provide a valid link")

    const urls = args[1];
    if (!urls)
      return message.reply({embeds: [noLink], allowedMentions: {repliedUser: false}})
    if (urls.length < 8)
    return message.reply({embeds: [noLink], allowedMentions: {repliedUser: false}})

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const m = await message.reply({content: "Fetching Screenshot... <a:Kao_loading:935476484024455178>", allowedMentions: {repliedUser: false}});
        const { body } = await fetch(
            `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
          );
    
          m.edit(
            { content: "Here's a screenshot from the given URL <a:haruhithumbsup:929369376048697345>",
              files: [{ attachment: body, name: "Kaocreenshotted.png" }]
            }
          );
    } catch (err) {
      if (err.status === 404)
      return message.reply("*WAaAa~* I couldnt find any results... <a:YuiNoLike:912603324518391829>")
    } 
    
 }
})  
