const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const AmeClient = require("amethyste-api");
const config = require("../../util/Data/config.json")
module.exports = new Command({

    name: "utatoo",
    aliases: ["tattoo", "tat", "tatoo"],
    description: "Sends a filtered image",
    type: "TEXT",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "ATTACH_FILES",
    cooldown: 4000,

    async run(message, args, client) {

         let AmeAPI = new AmeClient(config.imageapi);
         const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author;
 

         try {
           const m = await message.reply({content: "Generating image <a:Kao_loading:935476484024455178>", allowedMentions: {repliedUser: false}});
           const buffer = await AmeAPI.generate("utatoo", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
           const attachment = new Discord.MessageAttachment(buffer, "tat.png");

               m.edit({ content: "Generated <a:Kao_Thumbsup:936968227274256424>", files: [attachment], name: "utatoo.png", allowedMentions: {repliedUser: false}});
         } catch (err) {
           return message.reply("*Waa~* An error has occured... <a:YuiNoLike:912603324518391829>")
         } 	
    }
})
