const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')

module.exports = new Command({

    name: "eval",
    description: "Evaluation cmd",
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        try {
            var code = args.slice(1).join(' ');
            if (!code) return message.reply({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['pale red'])
                .setDescription("*Bakaa~* you need to eval something!")
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
            ], allowedMentions: {repliedUser: false}})

            if (code.includes('client.token'))
                return message.reply({ embeds: [new Discord.MessageEmbed()
                    .setColor(colour['pale red'])
                    .setDescription("*Bakaa~* I can not show you my token!")
                    .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                ], allowedMentions: {repliedUser: false}})
    
            var evaled = eval(code);

            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);

            const evaledembed = new Discord.MessageEmbed()
                .setColor(colour.pink)
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`js\n${clean(evaled)}\n\`\`\``
                );
            message.channel.send({ embeds: [evaledembed]});

        } catch (err) {
            const errembed = new Discord.MessageEmbed()
                .setColor(colour['light red'])
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`${clean(err)}\`\`\``
                );
            message.reply({ embeds: [errembed] });
        }

        function clean(text) {
            if (typeof text === 'string')
                return text
                    .replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203));
            else return text;
        }
    }
})