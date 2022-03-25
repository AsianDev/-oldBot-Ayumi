const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')

module.exports = new Command({

    name: 'levi',
    description: 'Levi Wallpaper',
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
            'https://cdn.discordapp.com/attachments/956433668698689536/956436852620005386/thumbbig-612511.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956436923277254686/thumbbig-682068.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437072846139442/thumbbig-653500.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437116936654869/thumbbig-937884.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437137903984650/thumbbig-937878.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437154463092736/thumbbig-807557.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437170019774514/thumbbig-1157372.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437192983592980/thumbbig-830700.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437228760993842/thumbbig-1002003.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437237065723914/thumbbig-992186.png',
            'https://cdn.discordapp.com/attachments/956433668698689536/956437254987993088/thumbbig-960058.png'
           ]
   
           var result = random[Math.floor(Math.random() * random.length)]
   
           let LofiEmbed = new Discord.MessageEmbed()
           .setColor("RANDOM")
           .setDescription(`**Name:** Levi\n**ID:** [${IDNumber}](${result})`)
           .setImage(result)
           .setFooter({ text: "Wallpaper | Levi", iconURL: `${message.guild.iconURL()}`})
           message.channel.send({embeds: [LofiEmbed]})

    }
})
