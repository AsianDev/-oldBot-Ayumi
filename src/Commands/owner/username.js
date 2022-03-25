const Command = require('../../Handlers/Command.js')

module.exports = new Command({
  name: 'username',
  description: "Changes my username",
  owner: true,
  type: "Text",
  aliases: ["change-username"],
  userPermissions: "",
  botPermissions: ["SEND_MESSAGES"],
  aliases: ["cuser", "cu"],

  async run(message, args, client) {

    await client.user.setUsername(args.slice(1).join(" "))
  }
})