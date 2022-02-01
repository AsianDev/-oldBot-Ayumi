const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "pp",
    description: "reveals your pp size",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["ADMINISTRATOR"],
    type: "TEXT",
    cooldown: 5000,
    async run(message, args, client) {
        const pp1 = [
            "8=D",
            "8==D",
            "8===D",
            "8====D",
            "8=====D",
            "8======D", 
            "*Waa~~* Im flattered you want... me to decide your pp size.（*゜ー゜*",
            "8=======D", 
            "8========D",
            "8=========D",
            "8==========D",
            "8===========D",
            "8=============D",
            "8==============D",
            "8================D",
            "8==================D",
            "8======================D",
            "8========================D",
            "8=========================D",
            "8==========================D",
            "8===========================D",
            "*Waa~~* why do you want a AI to determine you pp size?",
            "8============================D",
            "8==============================D",
            "8===============================D"
        ];
          const randompp = pp1[Math.floor(Math.random() * pp1.length)]; 
           const user = message.author;
           const ppembed = new Discord.MessageEmbed()
            .setTitle(`${user.tag} pp size`) 
             .setColor("YELLOW")
            .setDescription(`${randompp}`);
              message.channel.send({embeds: [ppembed]})}})