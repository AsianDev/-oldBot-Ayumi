const Command = require('../../Structures/Handlers/Command.js')
const Discord = require('discord.js')
const AmeClient = require("amethyste-api");
const config = require("../../config/Data/config.json")
module.exports = new Command({

    name: "rainbow",
    description: "Sends a filtered image",
    type: "TEXT",
    aliases: ["gay"],
    userPermissions: "SEND_MESSAGES",
    botPermissions: "ATTACH_FILES",
    cooldown: 4000,

    async run(message, args, client) {

         let AmeAPI = new AmeClient(config.imageapi);
         const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id === args[1]) || message.author;
 

         try {
          const m = await message.reply({content: "Generating image <a:Kao_loading:938867145331339264>", allowedMentions: {repliedUser: false}});
          const buffer = await AmeAPI.generate("gay", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
           const attachment = new Discord.MessageAttachment(buffer, "this_is_a_joke.png");

           m.edit({ content: "Generated <:Kao_mochaDance:765175325273227274>\n || this is a joke, if you think this should not be in the bot please dm my owner. he will take it out <3 ||", files: [attachment], name: "this_is_a_joke.png", allowedMentions: {repliedUser: false}});
         } catch (err) {
           return message.reply("*Waaa~* An error has occured... <a:YuiNoLike:912603324518391829>")
         } 	
    }
})
