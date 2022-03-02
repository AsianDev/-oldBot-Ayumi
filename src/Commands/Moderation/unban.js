/**@format */

const Discord = require("discord.js")
const Command = require('../../Handlers/Command.js')
const emotes = require("../../config/assets/Json/emotes.json")
module.exports = new Command({
    name: "unban",
    description: "Unban's someone from the server!",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: "BAN_MEMBERS",
      type: "TEXT",
    cooldown: 10000,

    async run (message, args, client) {
    
         let reason = args.slice(2).join(" ");
         let userID = args[1];
         const member = message.author;


         if (!reason) reason = 'No reason given.';
         if (!args[1]) return message.channel.send('You must state a member to unban. \n **Example:** \`Iki unban ID reason\`');
         args.shift()
         if (isNaN(args[0])) return message.channel.send('The ID stated is not a number.');
       
         message.guild.bans.fetch().then(async bans => {
           if (bans.size == 0) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Bakaa~* No one is banned on this server!")
          ]});
           let bUser = bans.find(b => b.user.id == userID);
           if (!bUser) return message.channel.send({embeds: [new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Waa~* Something went wrong when trying to find this user. \n Make sure the id is correct and that they are banned on this server!")
          ]});
           await message.guild.members.unban(bUser.user, reason).catch(err => console.log(err).then(message.channel.send('Somthing went wrong unbanning the ID.')));
         
           message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setDescription(`Successfully Unbanned **${bUser?.user?.tag}** from ${message.guild.name}`)
                .setColor("BLURPLE")
                .setFooter({ text: "Kaori©"})
              ]
            })

            const unbanned = new Discord.MessageEmbed()
            .setDescription(`Successfully Unbanned **${bUser?.user?.tag}** from ${message.guild.name}`)
            .setColor("BLURPLE")
            .addField("Unbanned by:", `> ${member.user.tag}`)
            client.channels.cache.get("924889631303012363").send({embeds: [unbanned]})

           
        })
    }
        
});
