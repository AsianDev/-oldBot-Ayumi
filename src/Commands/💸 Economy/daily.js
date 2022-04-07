const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js');
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const { msToTime } = require("../../config/functions/msToTime")
const DB = require("../../config/models/ecoDB")
const { ParseComma } = require("../../config/functions/parseComma")

module.exports = new Command({

    name: 'daily',
    aliases: ['today'], 
    description: 'Claim your dailway reward',
    type: 'Text',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    nsfw: false,
    maintance: true,

    async run(message, args, client) {


        if(await DB.findOne( 
            { 
                userID: message.author.id, 
                isPassive: true
            }
        )) return client.errorEmbed(message, `*Waa~* Please exit out of passive mode to use this command!`);

        const me = message.member;
        const nick = message.member.displayName || me.username || me.nickname

        let userData;
        try {
            userData = await DB.findOne({ userID: message.author.id })
            if (!userData) userData = await DB.create({ userID: message.author.id })
        } catch (err) {
            console.log(err)
        }
    
        const author = await DB.findOne({ userID: message.author.id })
        const timestamp = author.dailyAt ? Date.now() - author.dailyAt : (86400 * 1000)
    
        if (timestamp < (86400 * 1000)) {
            const remaining = (86400 * 1000) - timestamp
            const time = msToTime(remaining)
                
            const waitEmbed = new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setAuthor({ name: `${nick}`, iconURL: `${message.author.displayAvatarURL()}`, url: `${message.url}`})
                .setTitle(`${emotes.Error} Daily Cooldown`)
                .setDescription(`You have already claimed your daily Meji!\n Please wait **${time}** till you can use this command again!`)
                .setFooter({ text: ' ', iconURL: `${message.guild.iconURL()}`})
                .setTimestamp()
                return message.channel.send({ embeds: [waitEmbed] });
        }
        
        const broke = timestamp >= ((86400 * 1000) * 2);
        const streak = broke || author.dailyStreak + 1;
        const days = streak;
        let reward = 300;
    
        if (Date.now() - author.dailyAt > ((86400 * 1000) * 2)) { 
            author.dailyStreak = 1;
            await author.save();
        } else {
            author.dailyStreak += 1;
            await author.save();
        }
    
        const streakBonus = Math.round((0.02 * reward) * streak);
        if (streak > 1) {
            reward = reward + streakBonus;
        }
    
        const successEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Daily Rewards")
            .setDescription(`**$${ParseComma(reward)}** placed into your balance`)
            .setFooter({ text: `Streak: ${days} days ( +$${ParseComma(streakBonus)} )`})
            
        if (streak < 2) {
            successEmbed.setFooter({ text: 'Streak: 0 days ( +$0 )'});
        }
    
        if (broke) {
            successEmbed.setFooter({ text: '' });
        }
    
        author.dailyAt = Date.now();
        author.wallet += reward;
        await author.save();
    
        return message.channel.send({ embeds: [successEmbed] });

    }
})
