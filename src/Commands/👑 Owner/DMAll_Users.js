const Command = require('../../Handlers/Command.js')

module.exports = new Command({

    name: 'dmall',
    description: 'Send a message to all users',
    type: "Text",
    owner: true,
    userPermissions: '',
    botPermissions: 'ADMINISTRATOR',
    cooldown: 4000,
    nsfw: false,

    async run(message, args, client) {

        const messageQuery = args.slice(1).join(" ")
        if(!messageQuery) return message.reply('need message')
        try{
            await message.guild.members.cache.forEach(async (user) => {
           user.send(`${messageQuery}`)
           if (user.bot) return
           })
           }catch (error){
             console.log(error)
            }
            return message.channel.send(`I have sent a message to all users who have dms enabled.`)

    }
})
