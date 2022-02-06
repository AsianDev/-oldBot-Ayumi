const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')
module.exports = new Command({
    name: "eval",
    description: "Evaluation cmd",
    owner: true,
    type: "TEXT",
    userPermissions: "",
    botPermissions: ["SEND_MESSAGES"],

    async run(message, args, client) {

        try {
            var code = args.slice(2).join(' ');
            if (!code) return message.reply('You need to eval something.')

            if (code.includes('client.token'))
                return message.reply('*Waa~~* Wa.. Waa. Waa~t are you doing? Dont wanna do that 0_0');
            var evaled = eval(code);

            if (typeof evaled !== 'string')
                evaled = require('config').inspect(evaled);

            const embed = new Discord.MessageEmbed()
                .setColor("#FCC8EA")
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`js\n${clean(evaled)}\n\`\`\``
                );
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });

        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setColor("#FCC8EA")
                .addField('📥 Input: ', `\`\`\`${code}\`\`\``)
                .addField(
                    '📤 Output: ',
                    `\`\`\`${clean(err)}\`\`\``
                );
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
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