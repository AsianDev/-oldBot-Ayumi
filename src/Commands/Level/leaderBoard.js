// const Command = require('../../Handlers/Command.js')
// const Discord = require("discord.js");
// const Levels = require("discord-xp")
// module.exports = new Command({
//     name: "leaderboard",
//     description: "Check the leaderboard",
//     cooldown: 5000,
//     permission: "SEND_MESSAGES",
//     type: "TEXT",
//     aliases: ["lb"],
//     async run(message, args, client) {
//         const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 7)
//         const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
//         if(rawLeaderboard.length < 1) return message.reply({content: "There is not enough people on the leaderboard to be shown.", allowedMentions: {repliedUser: false}});
//         const lb = []

//         leaderboard.forEach(e => {
//             const obj = {
//                 positon: `${e.position}`,
//                 username: `${e.username}#${e.discriminator}`, 
//                 levels:` ${e.level}`, 
//                 xp: `${e.xp.toString()}`
//             }
//             lb.push(obj)
//         })
//             const embed = new Discord.MessageEmbed()
//         .setTitle("Server Leaderboard")
//         .setColor("BLURPLE")
        
//         leaderboard.forEach(rank => {
//             embed.addField(`${rank.username}`, `Level(s): **${rank.level}**`)
            
//         })
//         message.reply({
//             embeds: [embed],
//             allowedMentions: {repliedUser: false}
//         })
//     }})