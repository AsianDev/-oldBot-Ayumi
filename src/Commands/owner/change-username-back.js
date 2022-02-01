const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  name: 'change-user-back',
  description: "Changes my username",
  aliases: ["c.u.b"],
  owner: true,
  type: "TEXT",
  userPermissions: "",
  botPermissions: ["SEND_MESSAGES"],


  async run(message, args, client) {
    await client.user.setUsername("Kaori")
  }
})