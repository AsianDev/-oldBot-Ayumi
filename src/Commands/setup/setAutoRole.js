const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')
const welcomerole = require('../../util/models/welcomerole.js')
module.exports = new Command({
    name: "welcomerole",
    description: "autorole",
    aliases: ["setautorole", "autorole", "sautorole", "set-autorole", "set-auto-role"],
    type: "TEXT",
    timeout: 1000,
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["ADMINISTRATOR"],
    async run(message, args, client) {
      
      const role = message.mentions.roles.first() 
      const noChannel = new Discord.MessageEmbed()
      .setColor("DARK_RED")
      .setTitle("<:Ikix:904736839036993586> Missing Arguement!")
      .setDescription("Please mention the role you wish set the autrole as!")
      if (!role) return message.reply({embeds: [noChannel]})
      const data = await welcomerole.findOne({ guildId: message.guild.id }) // find the channel and store it in the DB

      let confirmation = new Discord.MessageEmbed()
          .setTitle(`Please Confirm`)
          .setDescription(`Are you sure, you want to set ${role} as the autrole?`)
          .setColor("BLURPLE")

      let cancelled = new Discord.MessageEmbed()
          .setTitle(`Cancelled`)
          .setDescription(`Cancelled setting ${role} as the auto role`)
          .setColor("RED")

      let confirmed = new Discord.MessageEmbed()
          .setTitle(`Confirmed`)
          .setDescription(`${role} has been set as the auto role.`)
          .setColor("GREEN")

      const confirmrow = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageButton()
                  .setCustomId('yes')
                  .setEmoji("<:Iki_tick:904736864076955738>")
                  .setStyle('SUCCESS')
          )
          .addComponents(
              new Discord.MessageButton()
                  .setCustomId('no')
                  .setEmoji("<:Ikix:904736839036993586>")
                  .setStyle('DANGER')
          )
      const disabledrow = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageButton()
                  .setCustomId('yes')
                  .setEmoji("<:Iki_tick:904736864076955738>")
                  .setStyle('SUCCESS')
                  .setDisabled(true)
          )
          .addComponents(
              new Discord.MessageButton()
                  .setCustomId('no')
                  .setEmoji("<:Ikix:904736839036993586>")
                  .setStyle('DANGER')
                  .setDisabled(true)
          )
      if (!data) {
          try {
              const m = await message.reply({ embeds: [confirmation], components: [confirmrow] })
              const filter = (b) => { if (b.user.id === message.author.id) return true; return menu.reply({ content: "<:Ikix:904736839036993586> This confirmation is not for you.", ephemeral: true }) };
              let collector = await m.createMessageComponentCollector({ filter: filter, time: 120000, max: 1 });

              collector.on('collect', async (i) => {
                  i.deferUpdate()
                  if (i.customId === 'yes') {
                      const data1 = await welcomerole.create({
                          Guild: message.guild.id,
                          Role: role

                      })

                      await data1.updateOne({ Role: role.id })
                      await m.edit({ embeds: [confirmed], components: [disabledrow] })
                      return;
                  }
                  else if (i.customId === 'no') {
                      await m.edit({ embeds: [cancelled], components: [disabledrow] })
                      return;

                  }
              })


          } catch (error) {
              console.log(error)
          }

      } else if (data) {
          const m = await message.reply({ embeds: [confirmation], components: [confirmrow] })
          const filter = (b) => { if (b.user.id === message.author.id) return true; return  menu.reply({ content: "<:Ikix:904736839036993586> This confirmation is not for you.", ephemeral: true }) };
          let collector = await m.createMessageComponentCollector({ filter: filter, time: 120000, max: 1 });

          collector.on('collect', async (i) => {
              i.deferUpdate()
              if (i.customId === 'yes') {
                  await data.updateOne({ welcomerole: role.id })
                  await m.edit({ embeds: [confirmed], components: [disabledrow] })
                  return;
              }
              else if (i.customId === 'no') {
                  await m.edit({ embeds: [cancelled], components: [disabledrow] })
                  return;

              }
          })
          collector.on('end', (mes, r) => {
              if (r == 'time') {
                  m.edit({
                      components: [disabled],
                  })
              }
          })
      }
  }
})   