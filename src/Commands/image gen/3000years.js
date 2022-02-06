const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const AmeClient = require("amethyste-api");
const config = require("../../config/Data/config.json")
module.exports = new Command({

    name: "3000years",
    description: "Sends a filtered image",
    type: "TEXT",
    aliases: ["3000yrs", "3000"],
    userPermissions: "SEND_MESSAGES",
    botPermissions: "ATTACH_FILES",
    cooldown: 4000,

    async run(message, args, client) {

         let AmeAPI = new AmeClient(config.imageapi);
         const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author;
 

         try {
          const m = await message.reply({content: "Generating image <a:Kao_loading:938867145331339264>", allowedMentions: {repliedUser: false}});
           const buffer = await AmeAPI.generate("3000years", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
           const attachment = new Discord.MessageAttachment(buffer, "3000yrs.png");
   
           m.edit({ content: "Generated <:Iki_mochaHeart:939483315952578610>", files: [attachment],name: "3000yrs.png", allowedMentions: {repliedUser: false}});
         } catch (err) {
           return message.reply("*Waa~* An error has occured... <a:YuiNoLike:912603324518391829>")
         } 	
    }
})
