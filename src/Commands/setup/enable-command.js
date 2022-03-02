const schema = require('../../config/models/command')
const Discord = require("discord.js")
module.exports = {
    name: "cmd-enable",
    type: "TEXT",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: "SEND_MESSAGES",
    aliases: ["enable-command", "enable-cmd", "enable"],
    description: "Enables a command",
    cooldown: 10000,
    async run(message, args, client) {
        const specifyCmdpls = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> please specify a command to enable OwO`)
        .setColor("#FB987B")

        const exist = new Discord.MessageEmbed()
        .setColor("#DE0F0F")
        .setDescription(`*Bakaa~!* This command doesnt exist please try again or do Kao help to view a list of a commands.`)

        const cmd = args[1];
        if(!cmd) return message.channel.send({embeds: [specifyCmdpls]})
        if(!!client.commands.get(cmd) === false) return message.channel.send({embeds: [exist]});
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  const disabledCmd = new Discord.MessageEmbed()
                  .setColor("#7BFB7F")
                  .setDescription(`Command **${cmd}** has been enabled!`)

                  const disabledFalse = new Discord.MessageEmbed()
                  .setColor("#F6F326")
                  .setDescription(`*Waa~~* ${cmd} has not been disabled in this server yet!`)

                  message.channel.send({embeds: [disabledCmd]})
              }  else return message.channel.send({embeds: [disabledFalse]})
          }
        })
    }
}