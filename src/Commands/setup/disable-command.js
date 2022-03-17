const schema = require('../../Structures/models/command')
const Discord = require("discord.js")
module.exports = {
    name: "cmd-disable",
    type: "TEXT",
    cooldown: 10000,
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: "SEND_MESSAGES",
    aliases: ["disable-command", "disable-cmd", "disable"],
    description: "disables command",
    async run(message, args, client) {
 
        const specified = new Discord.MessageEmbed()
        .setColor("#FB987B")
        .setDescription(`<@${message.author.id}> please specify a command to disable OwO`)
     
        const exist = new Discord.MessageEmbed()
        .setColor("#DE0F0F")
        .setDescription(`*Bakaa~!* This command doesnt exist please try again or do Kao help to view a list of a commands.`)

   const cmd = args[1];
   if(!cmd) return message.channel.send({embeds: [specified]})
   if(!!client.commands.get(cmd) === false) return message.channel.send({embeds: [exist]});



   const disabledAlready = new Discord.MessageEmbed()
   .setColor("#3B98E7")
   .setDescription(`*Bakaa~* ${cmd} has already been disabled in this server!`)

   schema.findOne({ Guild: message.guild.id }, async(err, data) => {
       if(err) throw err;
       if(data) {
           if(data.Cmds.includes(cmd)) return message.channel.send({embeds: [disabledAlready]});
           data.Cmds.push(cmd)
       } else {
           data = new schema({
               Guild: message.guild.id,
               Cmds: cmd
           })
       }
       await data.save();
       const disabledCmd = new Discord.MessageEmbed()
       .setColor("#7BFB7F")
       .setDescription(`Command **${cmd}** has been disabled!`)
       message.channel.send({embeds: [disabledCmd]})
   })
}
}