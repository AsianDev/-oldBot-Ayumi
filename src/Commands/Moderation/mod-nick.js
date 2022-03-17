const { Client, Message, MessageEmbed } = require("discord.js");
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  name: "modnick",
  description: "modnickname a user",
  userPermissions: ["MANAGE_NICKNAMES"],
  botPermissions: "MANAGE_NICKNAMES",
    type: "TEXT",
  aliases: ["modnickname", "mod-nick", "moderatename"],
  cooldown: 10000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   async run(message, args, client) {
let user = message.mentions.members.first();
if (!user) {
  user = message.guild.members.cache.get(args[1]);
}
if (!user) return message.reply({content: "*Waaa~* please mention a user to mod nick!"});

if (user.roles.highest.position >= message.guild.me.roles.highest.position)
  return message.reply(
    {content: `Please move my role to the very top of the roles list, this way i can mod nick the user`}
  );
if (user.roles.highest.position >= message.member.roles.highest.position)
  return message.reply(
    {content: `You cannot moderate a member's nickname that is higher/equal than your role`}
  );

function generateRandomString(length) {
  var chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var random_string = "";
  if (length > 0) {
    for (var i = 0; i < length; i++) {
      random_string += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }
  }
  return random_string;
}

const random = generateRandomString(9);

nickname = `${random}`;

try {
  await user.setNickname(nickname);
  message.channel.send({embeds: [
    new MessageEmbed()
      .setDescription(
        `Moderated Nickname for **${user.user.tag}** to \`${nickname}\``
      )
      .setColor("DARK_GREEN")
  ]
  }
  );
} catch (err) {
  message.reply({content:
    "An error occured while trying to moderate the nickname of that user."
  }
  );
  console.log(err);
}}})