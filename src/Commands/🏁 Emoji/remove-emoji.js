const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: "removeemoji",
  description: "Removes emoji from the server!",
  userPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  botPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  aliases: ['emoji-remove', 'remove-emoji', 'removeemoji'],
  type: 'Text',
  cooldown: 4000,
  nsfw: false,

  async run(message, args, client) {   

    const emoji = args[1]
    const emojiName = args[2]
    if (emoji) return client.missingArgueEmbed(message, `*Waa~* please mention/send a emoji!`)
    if (emojiName) return client.missingArgueEmbed(message, `*Waa~* please provide a name for this new emoji!`)
    let emo = args[1].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[1]
    if (!emo) return client.errorEmbed(message, `*Bakaa~* The emoji has to be in this server!`)
    if (message.guild.emojis.cache.get(emo)) {
      emo = message.guild.emojis.cache.get(emo)
    } else {
      return client.errorEmbed(message, `*Waa~* i couldnt find the emoji ${emoji}`)
    }
    if (!emo.name || !emo.id) return client.errorEmbed(message, `*Waa~* you provided an invalid emoji arguement!`)
    console.log(emo)
    try {
      emo.delete()
        client.successEmbed(message, `${emoji}'s name has been changed to ${args.slice(2).join("_")}`)
    } catch (err) {
        console.log(err)
        return client.errorEmbed(message, `*Waa~* something went wrong!`)
    }

}
})
