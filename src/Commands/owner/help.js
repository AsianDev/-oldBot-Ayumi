const Discord = require('discord.js')
const Command = require('../../Handlers/Command.js')
const fs = require('fs')

module.exports = new Command({
  name: 'ownerhelp',
  description: "help command",
  type: "Text",
  userPermissions: [""],
  aliases: ["owner-help", "ohelp", "ownerh", "o"],
  botPermissions: ["SEND_MESSAGES"],

  owner: true,

  async run(message, args, client) {
try {
    const dropdown = []
    const commands = []
    const embeds = []
    const directories = []
    const member = message instanceof Discord.CommandInteraction? message.guild.members.cache.find(user => user.id === message.user.id) : message.member
    fs.readdirSync('./src/Commands').forEach(dir => {
            directories.push(dir)
    })

    directories.forEach(dir => {
        const option = {
            label: `${dir}`,
            description: `Commands for ${dir}`,
            value: `${dir}`,
        }
        dropdown.push(option)
    })

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Pick a category')
        .addOptions(dropdown)
    )

    directories.forEach(dir => {
        fs.readdirSync(`./src/Commands/${dir}`)
        .filter(file => file.endsWith('.js'))
        /**
         * @type {Command[]}
         */
        .forEach(cmds => {
            const cmd = require(`../${dir}/${cmds}`)
            let command = {
                name: cmd.name,
                description: cmd.description,
                aliases: cmd.aliases,
                category: dir
            }
            commands.push(command)
        })
    })

    directories.forEach(dir => {
        const embed = new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`List of commands:`)
        .setTitle(`${dir} Commnds`)
        
        commands.filter(cmd => cmd.category === dir).forEach(cmd => {
            embed.addField(`\`${cmd.name}\``, `${cmd.description}`, true)
        })

        const tempEmbed = {
            category: dir,
            embed: embed
        }
        embeds.push(tempEmbed)
    })

    const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`You have 30 seconds.`)
    .setDescription(`Owner help command`)
    .setColor('BLURPLE')

    const m = await message.reply({embeds: [embed], components: [row]})
    const msg = message instanceof Discord.CommandInteraction ? await message.fetchReply() : m;

    const collector = msg.createMessageComponentCollector({componentType: 'SELECT_MENU', time: 30000, })  
    collector.on('collect', async (i) => {
        if (i.user.id !== member.id) return message.reply({content: '*Waa~* this is not for you!', ephemeral: true})
            
        i.update({embeds:[embeds.find(c => c.category === i.values[0]).embed]})
    })

    collector.on('end', async (i) => {
        
    })
} catch(e) {
    message.channel.send(e)
}

}});
