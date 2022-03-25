const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js");

module.exports = new Command({
  name: "addroleall",
  aliases: ["arall", "aroleall", "giveroleall", "mass-role", "role-all", "mass-add-role", "give-all", "m.a.r"],
  description: "Add a role to all user of the current server.",
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
 type: "Text",
  
  cooldown: 10000,
  async run(message, args, client) {
    const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (!role) return message.reply(
        "Please provide a valid role"
    );
    
    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) return message.reply(
        `My role is not high enough than **${
          role.name
        }** role!`
    );

    if (message.member.roles.highest.comparePositionTo(role) < 0) return message.reply(
        `Your role must be higher than **${
          role.name
        }** role!`
    );

    let type = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Bots")
        .setCustomId("bot"),
      new Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Otaku's")
        .setCustomId("member")
    );
    let embed = new Discord.MessageEmbed().setDescription(
      "*Waaa~* Who are you going to give the roles to? (๑ᵔ⤙ᵔ๑)"
    )
    .setColor("RANDOM")
    let msg = await message.channel.send({
      embeds: [embed],
      components: [type]
    });
    let filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter
    });
    collector.on("collect", async i => {
      if (i.customId === "member") {
        message.guild.members.cache
          .filter(member => !member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return message.reply(
          `Successfully Added **${
            role.name
          }** to Members`
        );
      }
      if (i.customId === "bot") {
        message.guild.members.cache
          .filter(member => member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return message.reply(
          `Successfully Added **${
            role.name
          }** to Bots`
        );
      }
    });
  }
})