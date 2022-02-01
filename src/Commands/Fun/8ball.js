const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
module.exports = new Command({
    name: "8ball",
    description: "8ball its pretty simple",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 5000,
    aliases: ["question"],
    async run (message, args, client) {
        if(!args[2]) return message.reply(":x: Please ask a full question!");
        let question = args.slice(1).join(" ");

        let replies = ["Yes.",
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definelty.",
        "You may rely on it.",
        "As I see it, yes.",
        `For the last time im not... oh sorry you asked **${question}**... Sorry im going to have to say || n || || o ||`,
        "Most likely.",
        "Outlook good.",
        "No.",
        "Im watching one piece right now...",
        "My finger is pointing to No",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now...",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good...",
        "Very doubtful.",
        "Ikigai is busy right now...",
        "I say || yes ||",
        "When did i ask?",
        "Y E S",
        "Doing a giveaway... nah jk, but no.",
        "*Waa~* || No ||"
    ]
        let result = Math.floor((Math.random() * replies.length));

        const ateballEmbed = new Discord.MessageEmbed()

        .setColor("#FCC8EA")
        .setTitle(":8ball: Question")
        .setDescription(`${question}:`)
       .addField(":8ball: Answer:", replies[result])  
       .setFooter({ text: `Asked by ${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})

       message.channel.send({ embeds: [ateballEmbed] });         
    }
})