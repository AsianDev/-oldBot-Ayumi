const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");
const colour = require('../../config/assets/Json/colours.json')
const toHex = require("colornames");
const emoji = require("../../config/assets/Json/emotes.json")

module.exports = new Command({
  name: "createrole",
  description: "give a user a role.",
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
  type: "Text",
    cooldown: 4000,
    aliases: ["make-role", "cr-role", "crole", "create-role", "makerole", "crerole"],

  async run(message, args, client) {

    const name = args.slice(1).join(" ");
    const regex = !/[^a-zA-Z0-9]+/g.test(name);
    const rColour = args[1]

    if (!rColour) {
      return client.errorEmbed(message, `*Waa~* please provide a valid hex colour`)
    }
    if (!name) {
      return client.errorEmbed(message, `*Waa~* please provide a valid name for the role!`)
    }

    if (regex === false) {
      return client.errorEmbed(message, `*Waa~* please provide a valid name for the role!\n (Only use letters or numbers please)`)

    }

    if (name.length > 100) {
      return client.errorEmbed(message, `*Waa~* The name cant be longer than 100 characters!`)

    }
   await message.guild.roles.create({
        data: {
          name: name,
          color: toHex(rColour),
        },
      })
      return message.channel.send({ embeds: [new Discord.MessageEmbed()
        .setColor(colour.pink)
        .setTitle(`${emoji.Tick} Succesfully made a new role!`)
        .setTimestamp()
        .addField("Name:", `${name}`)
        .addField("Colour:", `${rColour}`)
      ]})

    }
});