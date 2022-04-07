const muteSchema = require("../../config/models/muterole")
const Command = require('../../Handlers/Command.js')
const removerole = require("../../config/models/removerole.js")
const Discord = require("discord.js")
const colour = require("../../config/assets/Json/colours.json")
const emotes = require("../../config/assets/Json/emotes.json")
const { Main_Guild } = require("../../config/Data/settings.json")
const DB = require("../../config/models/loggerDB.js")

    module.exports = new Command({  
        name: "unmute",
        description: "unmute a user",
        type: "Text",
        cooldown: 7000,
        aliases: ["un-mute"],
        userPermissions: "KICK_MEMBERS",
        botPermissions: "MANAGE_ROLES",
     async run(message, args, client) {


        const Data = await DB.findOne({
            GuildID: message.guild.id
        })
        if (!Data || !Data.Logs) return;
        const logsChannel = message.guild.channels.cache.get(Data.Logs);

        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[1])
        if (!member) {
            return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour["pale red"]) 
                .setDescription("*Waa~~* please mention a user to unmute!")
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)   
            ]});
        }
        if (member.id === message.author.id) {
            return message.channel.send({embeds: [new Discord.MessageEmbed()
                .setColor(colour["pale red"]) 
                .setDescription("Are you dumb? you cant unmute yourself o.o")
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)   
            ]});
        }
        let clientUserunmute = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Waaa~* Why are you trying to unmute me?")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)

        let Authorrunmute = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Waaa~* Why are you trying to unmute yourself?")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)

        let roleUnder = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Bakaa~* My role is under that user's role!\n Please move my role to the top of the roles list!")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)

        let sameroletarget = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Bakaa~* You have same the role as who you are trying to unmute!")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)

        let roleOver = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Bakaa~* Their role is higer than your role.")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)


        let roleSame = new Discord.MessageEmbed()
        .setColor(colour['light red'])
        .setDescription("*Waaa~* They have the same role as me!")
        .setTitle(`${emotes.Error} AN ERROR OCCURED`)

        if (member.user === client.user) return message.reply({embeds: [clientUserunmute], allowedMentions: {repliedUser: false}})
        if (member.user === message.author) return message.reply({embeds: [Authorrunmute], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply({embeds: [roleUnder], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position === message.member.roles.highest.position) return message.reply({embeds: [sameroletarget], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position > message.member.roles.highest.position) return message.reply({embeds: [roleOver], allowedMentions: {repliedUser: false}})
        if (member.roles.highest.position === message.guild.me.roles.highest.position) return message.reply({embeds: [roleSame], allowedMentions: {repliedUser: false}})


        let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reason has been provided."

        const unmute = new Discord.MessageEmbed()
        .setTitle(`Punishment - unmuted`)
        .setColor(colour.pink) 
        .setDescription(`You have been unmuted by **${message.author.username}**[\`${message.author.id}\`] for \n \`\`\`\n${reason}\`\`\``)        

        let unmuteModel;
        try {
       unmuteModel = await muteSchema.findOne({ 
            Guild: member.guild.id, 
       })
       if(!unmuteModel)  {
         unmuteModel = await muteSchema.create({
            Guild: member.guild.id, 
            Role: undefined
        });
        unmuteModel.save()
    }
    const role = member.guild.roles.cache.find(role => role.id == unmuteModel.Role);
    if (!role) {
        return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(colour["light red"])
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Waa~* the Mute role has not been set yet!")
        ]});                
    }
    await member.roles.remove(role.id);

} catch(e) {
    console.log(e)
}
message.channel.send({embeds: [new Discord.MessageEmbed()
    .setTitle(`Punishment - Un-Muted`)
    .setColor(colour.pink) 
    .setDescription(`${member} has been un-muted by **${message.author.username}** [\`${message.author.id}\`] for \n \`\`\`\n${reason}\`\`\``)        
]}) 
try {
    if(!member.user.bot) {
member.send({embeds: [unmute]})
    }
} catch(e) {
    console.log(e)
}
logsChannel.send({embeds: [new Discord.MessageEmbed()
    .setColor(colour["light red"])
    .setTitle(`${emotes.Moderator} A Mute has been Removed!`)
    .setAuthor({ name: `${member.user.username}`, iconURL: `${member.displayAvatarURL()}`})
    .setDescription(`> **User:** \n ${member}`)
    .addField("> Reason:", `\`\`\`${reason}\`\`\``)
]})

if(message.guild.id === Main_Guild) { // if it is my main server
let remove;
try{
remove = await removerole.findOne({ 
Guild: member.guild.id, 
})
if(!remove)  {
remove = await removerole.create({
   Guild: member.guild.id, 
   Role: undefined
});
remove.save()
}
    const role = member.guild.roles.cache.find(role => role.id == remove.Role);
    if (!role) {
        return message.reply({embeds: [new Discord.MessageEmbed()
            .setColor(colour["light red"])
            .setTitle(`${emotes.Error} AN ERROR OCCURED`)
            .setDescription("*Waa~* the remove role has not been set yet!")
        ]});
    }
    await member.roles.add(role.id);
} catch(e) {
    console.log(e)
}
} else { // if it is not my main server
return;
}

}
})