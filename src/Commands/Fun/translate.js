const Command = require('../../Structures/Handlers/Command.js')
const translate = require('@iamtraction/google-translate');

module.exports = new Command ({
    name: "english-to",
    cooldown: 5000,
    aliases: ["en-translate", "translate"],
    description: "translate something",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    async run(message, args, client) {

        const query = args.slice(1).join(" ");
        if(!query) return message.channel.send(`${message.author.username} please specify something to translate `)

        const translated = await translate(query, {to: 'en'});
        message.channel.send(translated.text);

}})    