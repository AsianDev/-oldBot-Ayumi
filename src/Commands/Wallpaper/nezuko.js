const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'nezuko',
    description: 'Nezuko Wallpaper',
    type: 'Text',
    userPermissions: 'SEND_MESSAGES',
    botPermissions: 'KICK_MEMBERS',
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        function generateRandomString(length) {
			var chars =
			  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|/.@#!$%^&+><?;:~*=";
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
            'https://cdn.discordapp.com/attachments/795426735515631706/800710706252087296/tenor_5.gif',
            'https://cdn.discordapp.com/attachments/800705727555305492/800707343239086120/d5a892eb278afb8fdfbd740926f5356c.jpg',
            'https://cdn.discordapp.com/attachments/800858237226319902/800859539905708072/29721dd78d4850e17225bfb768e2e935.jpg',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438056376860732/thumbbig-1042579.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438078422142997/thumbbig-1052239.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438099448201216/thumbbig-1105901.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438107811643433/thumbbig-1078895.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438130146291723/thumbbig-1020745.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438344328441906/thumbbig-1024472.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438334291472384/thumbbig-1203069.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438365270577173/thumbbig-1024024.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438469704572959/thumbbig-1218246.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438520971542528/thumbbig-1221596.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438514873032704/thumbbig-1215575.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438754292289536/thumb-963678.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438765881147402/thumb-961253.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438786630377512/thumb-958374.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438810353344542/thumb-952378.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956438826845364294/thumb-946102.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let LofiEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Nezuko\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Nezuko", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [LofiEmbed]})

    }
})
