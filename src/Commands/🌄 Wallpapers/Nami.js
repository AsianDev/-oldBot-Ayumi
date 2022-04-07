const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'nami',
    description: 'Nami Wallpaper',
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
            'https://cdn.discordapp.com/attachments/938866521499906069/956433614902542336/wp2740751.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956433757978652692/wp149830.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956433776337104916/wp2740604.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956433800404037693/wp2740556.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956433880691404810/wp4392290.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956434091090251897/HD-wallpaper-nami-naruto-luffy-zoro-one-piece-sanji-anime-thumbnail.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956434122056810536/HD-wallpaper-nami-one-piece-thumbnail.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956434284418306058/thumbbig-769833.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956434308686573568/thumbbig-769831.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956434957595721759/white-dress-nami-cleavage-tattoo-wallpaper-preview.png',
            'https://media.discordapp.net/attachments/956433668698689536/956435003531743232/illustration-artwork-digital-art-fan-art-neoartcore-artist-hd-wallpaper-preview.png?width=332&height=498',
            'https://cdn.discordapp.com/attachments/956433668698689536/956435154866413568/anime-girls-nami-hd-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956435465853075486/one-piece-nami-drahlcom-1680x1050-anime-one-piece-hd-art-wallpaper-preview.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let NamiEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Nami\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Nami", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [NamiEmbed]})

    }
})
