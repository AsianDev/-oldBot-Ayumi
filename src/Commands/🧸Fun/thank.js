const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const thankDB = require("../../config/models/thankDB")
const c = require("../../config/assets/Json/colours.json")
const e = require("../../config/assets/Json/emotes.json")

module.exports = new Command({

    name: 'thank',
    description: 'Give rep points to a member!',
    type: 'Slash',
    userPermissions: "SEND_MESSAGES",
    botPermissions: 'SEND_MESSAGES',
    cooldown: 86400000, // 24 hours
    slashCommandOptions: [{
        name: "user",
        description: "Who will you give rep points to?",
        type: "USER",
        required: true,
    },
    {
        name: "reason",
        description: "Why will this user be recieving rep points?",
        type: "STRING",
        required: true,
  
     }
],

    async run(interaction, args, client) {

        const user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(user.id)
        const nickname = member.user.displayName || member.user.username || member.nickname

        let data;
        try {
            data =  await thankDB.findOne({ 
                GuildID: interaction.guild.id, 
                UserID: member.id 
            })
        } catch (err) {
            console.log(err);
        }
            if(!data) {
              data = await thankDB.create({
                GuildID: interaction.guild.id,
                UserID: member.id,
                ThanksCount: 1
              });
              data.save();
    
              interaction.followUp({embeds: [new Discord.MessageEmbed()
                .setColor(c.pink)
                .setAuthor({ name: `${nickname}`, iconURL: `${member.user.displayAvatarURL()}`})
                .setTitle(`${e.Tick} Rep Point Added!`)
                .setDescription(`You have thanked ${member} and they now have \`1\` rep points!`)
                .addField("Reason:", `${reason}`)
            ], ephemeral: true})
        
        } else {
              data.ThanksCount++
    
              await thankDB.findOneAndUpdate({ GuildID: interaction.guild.id, UserID: member.id }, data);
              
              interaction.followUp({embeds: [new Discord.MessageEmbed()
                .setColor(c.pink)
                .setAuthor({ name: `${nickname}`, iconURL: `${member.user.displayAvatarURL()}`})
                .setTitle(`${e.Tick} Rep Point Added!`)
                .setDescription(`You have thanked ${member} and they now have \`${data.ThanksCount}\` rep points!`)
                .addField("Reason:", `${reason}`)
            ], ephemeral: true})
            }
          }
        })
