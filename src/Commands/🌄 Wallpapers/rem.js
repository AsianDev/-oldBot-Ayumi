const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'rem',
    description: 'Rem Wallpaper',
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
            'https://cdn.discordapp.com/attachments/956433668698689536/957046155529818112/tenor.gif',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044639729328158/rem-re-zero-kara-hajimeru-isekai-seikatsu-anime-girls-blue-hair-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044650470952990/anime-girls-rem-re-zero-re-zero-kara-hajimeru-isekai-seikatsu-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044680158228560/re-zero-kara-hajimeru-isekai-seikatsu-anime-girls-rem-re-zero-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044700982947860/rem-re-zero-re-zero-kara-hajimeru-isekai-seikatsu-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044922236698744/rem-rezero-anime-kawaii-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957044937147432970/rem-re-zero-re-zero-kara-hajimeru-isekai-seikatsu-blue-eyes-blue-hair-wallpaper-preview.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957045154815041536/thumbbig-743146.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957045237342171166/thumbbig-734752.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957045254157123614/thumbbig-735314.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957045284179947581/thumbbig-719591.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046458660552714/thumbbig-733033.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046474989006898/rem-kawai-rem.gif',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046477375545374/thumbbig-813042.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046493079035914/thumbbig-720106.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046498934288414/thumbbig-713689.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/957046526423756841/thumbbig-711979.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let LofiEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Rem\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Rem", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [LofiEmbed]})

    }
})
