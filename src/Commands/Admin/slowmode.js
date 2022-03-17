const Command = require('../../Structures/Handlers/Command.js')
module.exports = new Command({
    name: 'slowmode',
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    cooldown: 10000,
    description: "gives custom slowmode!",
    aliases: ["sm", "slow", "chat-slower"],
    async run(message, args, client) {
        if(!args[1]) return message.channel.send('Please state a number to set the slowmode.');
        if(isNaN(args[1])) {
            return message.channel.send(`${args[1]} is not a number you little baka...`)
        }else {
            message.channel.setRateLimitPerUser(args[1]);
            message.channel.send(`Slowmode is now: ${args[1]}s`);
        }
    }
});