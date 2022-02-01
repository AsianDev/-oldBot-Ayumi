const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const { MessageActionRow, MessageButton} = require('discord.js');
const ms = require("ms")
module.exports = new Command({

    name: 'timestamp',
    description: "Generate a timestamp",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    type: "TEXT",
    aliases: ["ts"],
    cooldown: 7000,

    async run(message, args, client) {

        const Notime = new Discord.MessageEmbed()
        .setColor("#E6604D")
        .setTitle(`<:Ikix:904736839036993586> MISSING ARGUEMENT`)
        .setDescription("*Baaka~* You need to give a time to show a **time**stamp >//<")

        //<t:${(Date.parse(message.createdAt)+ms(time))/1000}:R>
        let time = args[1]
        if(!time) return message.reply({embeds: [Notime], allowedMentions: {repliedUser: false}})
      //  message.reply(`\`<t:${(Date.parse(message.createdAt)+ms(time))/1000}:R>\``)

      const embed = new Discord.MessageEmbed()
      .setTitle(`Timestamp generator — From Now`)
      .addField(`📥 Input`, `\`\`\`${ms(ms(time), { long: true })} from now.\`\`\``, true)
      .addField(`📤 Output`, `<t:${Math.round(Date.now() / 1000) + (ms(time) / 1000)}:R>`, false)
      .setColor(`#4D9AE6`)


      const embed2 = new Discord.MessageEmbed()
      .setTitle(`Timestamps for ${ms(ms(time), { long: true})}`)
      .setDescription(`\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:R>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:R>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:F>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:F>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:f>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:f>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:D>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:D>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:d>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:d>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:T>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:T>\n\`\<t:${(Date.parse(message.createdAt)+ms(time))/1000}:t>\` -> <t:${(Date.parse(message.createdAt)+ms(time))/1000}:t>`)
      .setColor(`#FFD461`)
      .setTimestamp()

      let button = new MessageButton()
      .setLabel(`Copy Unix`)
      .setStyle("SUCCESS")
      .setCustomId('*')


      let row = new MessageActionRow()
      .addComponents(button)


      const msg = await message.channel.send({ embeds: [embed], components: [row]})
      const col = msg.createMessageComponentCollector({ time: 60000})

      let dirow = new MessageActionRow()
      .addComponents(button.setDisabled(true).setStyle("SECONDARY"))

      col.on('collect', async b => {
          if(b.customId == "*") {
              b.reply({ embeds: [embed2], ephemeral: true})
              msg.edit({ components: [dirow]})
          }
      })
      col.on("end", b => {
          msg.edit({ components: [dirow]})
      })


    }
})
