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
        const now = new Date()

        const authorData = await thankDB.findOne({
            guildId: interaction.guild.id,
            userId: member.id,
        })

        if (authorData && authorData.lastGave) {
            const then = new Date(authorData.lastGave)

            const diff = now.getTime() - then.getTime()
            const diffHours = Math.round(diff / (1000 * 60 * 60))

            const hours = 24    
            if (diffHours <= hours) {
               return interaction.followUp({ embeds: [new Discord.MessageEmbed()
                .setDescription(`*Sowwy~* but you need to wait ${hours} hours to thank someone again!`)
                .setColor(c['light red'])
                .setTitle(`${e.Error} AN ERROR OCCURED`)
            ]})
            }
        }

        let data;
        try {
            data = await thankDB.findOne({ 
                guildId: interaction.guild.id,
                userId: member.id,
                lastGave: now,
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
