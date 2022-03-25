const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'naruto',
    description: 'Naruto Wallpaper',
    type: 'Text',
    userPermissions: 'SEND_MESSAGES',
    botPermissions: 'KICK_MEMBERS',
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        function generateRandomString(length) {
			var chars =
			  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|/.@#!$^&+><?~*=";
			var random_string = "";
			if (length > 0) {
			  for (var i = 0; i < length; i++) {
				random_string += chars.charAt(
				  Math.floor(Math.random() * chars.length)
				);
			  }
			}
			return random_string;
		  }
		  
		  const id = generateRandomString(5);           
		  IDNumber = `${id}`;

        
        let random = [
            'https://cdn.discordapp.com/attachments/956433668698689536/956439146925260840/thumbbig-47438.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439186393677834/thumbbig-614743.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439201027604500/thumbbig-532559.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439233336324186/thumbbig-605598.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439254865690644/thumbbig-270187.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439323237048320/thumbbig-644208.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439366618710056/thumbbig-598782.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439485091041300/naruto-shippuuden-uzumaki-naruto-namikaze-minato-crying-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439784782438400/naruto-shippuuden-uzumaki-naruto-masashi-kishimoto-new-generation-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956439803619057694/anime-naruto-kurama-naruto-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956440065024864277/naruto-shippuuden-uzumaki-naruto-masashi-kishimoto-jinchuuriki-wallpaper-preview.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let NarutoEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Naruto\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Naruto", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [NarutoEmbed]})

    }
})
