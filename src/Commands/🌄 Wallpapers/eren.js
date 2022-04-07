const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'eren',
    description: 'Lofi Wallpaper',
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
            'https://cdn.discordapp.com/attachments/800699401591980052/801282198245998602/f5256ee617b66f4290aaed5e589023ea.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441753932685312/thumbbig-612507.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441779341758525/thumbbig-606229.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441791475892235/thumbbig-595140.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441812564840448/thumbbig-682080.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441826808725534/thumbbig-582792.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441826808725534/thumbbig-582792.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441860711272498/thumbbig-1127205.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956441851106316298/thumbbig-1126962.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let LofiEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Eren\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Eren", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [LofiEmbed]})

    }
})
