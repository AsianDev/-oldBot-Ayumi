const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require("../../Handlers/Command.js");
const colour = require("../../config/assets/Json/colours.json")
const { paginate } = require("../../Systems/PaginationSys")

module.exports = new Command({
  name: 'help',
  description: "Ayumi help command",
  type: "Text",
  cooldown: 3000,
  aliases: ["he;p", "jelp", "h", "hejkl", "holp", "hel"],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {

    const helpembed = new Discord.MessageEmbed()
        .setTitle("Catergories you will go through.")
        .setURL("https://discord.gg/TQ3mTPE7Pf")
        .addField('Catergory', " 🎬 ``Action``\n  🪙 `Economy`\n 😜 ``Fun`` \n 🖼️ ``Image`` \n <:Iki_info:938937122931503194> ``Information``\n  🛡️ ``Moderation``\n 🗒️ ``Setup``\n <:Links:904222183813947463> ``Support``\n ✅ ``Utility``\n 🖼️ ``Wallpaper``\n\n   **|** [**Discord**](https://discord.gg/myztGNxaJQ)  **|** [**Vote**](https://top.gg/servers/873143392488525834)", false)
        .setFooter({ text: `Requested by ${message.author.tag} • ${client.commands.size} Commands in total`})
        .setColor(colour.pink)
        .setThumbnail(message.member.user.displayAvatarURL({dynamic: true, size: 2048,}))


    const action = new Discord.MessageEmbed()
     .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
     .setDescription("```yaml\n Syntax: Ayu <Roleplay Command>```")
     .addField('__🎎 ACTIONS__', '\`\`\`ini\n[ amazing, bite, blush, boop, confused, cook, cry, cuddle, dance, die, dodge, drive, eat, facedesk, goodnight, happy, hide, highfive, hug, kill, kiss, laugh, lick, mad, nervous, nom, nosebleed, pat, poke, punch, run, sad, scream, shocked, slap, sleepy, smile, stare, stomp, tease, think, thumbsup, tickle, vomit, waifu, wave, wink, yeet ]\n\`\`\`')
     .setTimestamp()
    .setColor("BLUE")
    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
    .setFooter({ text:` > Ayumi • ${message.channel.name}`})


    const fun = new Discord.MessageEmbed()
       .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
        .setDescription("```yaml\n Syntax: Ayu <Fun Command>```")
        .addField('__😜 FUN COMMANDS__', '\`\`\`ini\n[ 8ball, baka, clyde, coinflip, dare, flip, hack, howotaku, javen, lyrics, meme, motivate, password, pp, screenshot, reddit, ship, translate, truth, weather, wwn ]\n\`\`\`')
        .setTimestamp()
        .setColor("BLUE")
        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setFooter({ text:` > Ayumi • ${message.channel.name}`})

         const image = new Discord.MessageEmbed()
         .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
         .setDescription("```yaml\n Syntax: Ayu <Image Command>```")
          // normal
          .addField('__🖼️ IMAGES__', '\`\`\`ini\n [ amongus, captcha simp-card, cat, dog, panda, wallpaper  ]\n\`\`\`')
       //filter
          .addField('__🖼️ FILTER IMAGE__', '\`\`\`ini\n [ blur, blurple, circle, deepfry, emboss, glitch, greyscale, invert, magik, rainbow, sepia, sharpen ]\n\`\`\`')
         // image gen
          .addField('__🖼️ IMAGE GENERATION__', '\`\`\`ini\n[ 3000yrs, approved, beautiful, brazzers, burn, challenger, crush, fire, jail, missionpassed, ps4, rip, scary, symmetry, tatoo, triggered, wanted, wasted ]\n\`\`\`')
          .setTimestamp()
          .setColor("BLUE")
          .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
          .setFooter({ text:` > Ayumi • ${message.channel.name}`})

            const info = new Discord.MessageEmbed()
            .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
            .setDescription("```yaml\n Syntax: Ayu <Information Command>```")
            .addField('__❓ INFORMATION__', '\`\`\`ini\n[ avatar, bot-info, cmdhelp, firstmsg, guildinvite, imdb-search, membercount, oldest, owner, ping, userinfo, urban, user-search, whois, youngest ]\n\`\`\`')
            .setTimestamp()
            .setColor("BLUE")
            .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
            .setFooter({ text:` > Ayumi • ${message.channel.name}`})

              const mod = new Discord.MessageEmbed()
              .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
              .setDescription("```yaml\n Syntax: Ayu <Moderation Command>```")
              .addField('__🛡️ MODERATION__', '\`\`\`ini\n [ ban, clear, dm, blist, kick, lock, mod-nick, mute, nick, remove-allwarns, remove-timeout, remove-warn, reset-nick, role-info, steal-emoji, timeout, unban, unlock, unmute, warn, warnings ]\n\`\`\`')
              .addField('__👑 ADMINSTRATION__', '\`\`\`ini\n[ channel-create, channel-delete, create-role, create-vc, announce, give-role, mass-add-role, mass-remove-role, channel-nuke, slowmode ]\n\`\`\`')
              .addField('__🎉 EVENTS__', '\`\`\`ini\n[ gtn ]\n\`\`\`')
              .setTimestamp()
              .setColor("BLUE")
              .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
              .setFooter({ text:` > Ayumi • ${message.channel.name}`})

                const setup = new Discord.MessageEmbed()
                .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                .setDescription("```yaml\n Syntax: Ayu <Setup Command>```")
                .addField('__🗒️ SET CHANNEL__', '\`\`\`ini\n[ set-boostchannel, set-leavechannel, set-suggestchannel, set-welcomechannel ]\n\`\`\`')
                .addField('__🗒️ OTHER__', '\`\`\`ini\n[ disable-command, enable-command, reset-mute, reset-remove, sremove, set-autorole, setmuterole, setverifyrole]\n\`\`\`')
                .setTimestamp()
                .setColor("BLUE")
                .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                .setFooter({ text:` > Ayumi • ${message.channel.name}`})


                    const ticket = new Discord.MessageEmbed()
                    .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                    .setDescription("```yaml\n Syntax: Ayu <Support Command>```")
                    .addField('__📨 SUPPORT__', '\`\`\`ini\n[ report, backup ]\n\`\`\`')
                    .setTimestamp()
                    .setColor("BLUE")
                    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                    .setFooter({ text:` > Ayumi • ${message.channel.name}`})

                        const HelpBackup = new Discord.MessageEmbed()
                        .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                        .setDescription("```yaml\n Syntax: Ayu <Backup Command>```")
                        .addField('__⚙️ BACKUP__', '\`\`\`[ Backup Create, Backup Load, Backup Info, Backup Delete ]\n\`\`\`')
                        .setTimestamp()
                        .setColor("BLUE")
                        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                        .setFooter({ text:` > Ayumi • ${message.channel.name}`})

                  const configity = new Discord.MessageEmbed()
                  .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                  .setDescription("```yaml\n Syntax: Ayu <Utility Command>```")
                  .addField('__<:Iki_uwu:934418076877881395> EMOJI__', '\`\`\`ini\n[ enlarge-emoji ]\n\`\`\`')
                  .addField('__✅ MISC__', '\`\`\`ini\n[ afk, animesearch, banner, poll, report-bug, servericon serverinfo, timestamp, uptime ]\n\`\`\`')
                  .addField("__📬 SUGGESTIONS__", '\`\`\`ini\n[ suggest, accept, deny ]\n\`\`\`')
                  .setTimestamp()
                  .setColor("BLUE")
                  .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                  .setFooter({ text:` > Ayumi • ${message.channel.name}`})

              const DevEmbed = new Discord.MessageEmbed()
              .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
            .setDescription("```yaml\n Syntax: Ayu <Dev Command>```")
            .addField('__<a:developer_badge1:944443520180158534> Develepor__', '\`\`\`ini\n[ bin, e ]\n\`\`\`')
            .setTimestamp()
            .setColor("BLUE")
            .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
            .setFooter({ text:` > Ayumi • ${message.channel.name}`})
            const devrow = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )

              const WallPaperEmbed = new Discord.MessageEmbed()
              .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
              .setDescription("```yaml\n Syntax: Ayu <Wallpaper Command>```")
              .addField('__🖼️ WALLPAPER__', '\`\`\`ini\n[ eren, levi, nami, naruto, nezuko, rem ]\n\`\`\`')
              .setTimestamp()
              .setColor("BLUE")
              .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
              .setFooter({ text:` > Ayumi • ${message.channel.name}`})

              const eco = new Discord.MessageEmbed()
              .setAuthor({ name: "Ayumi HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
              .setDescription("```yaml\n Syntax: Ayu <Economy Command>```")
              .addField('__🪙 ECONOMY__', '\`\`\`ini\n[ bal, beg, crime, daily, deposit, pay, withdraw, work ]\n\`\`\`')
              .setTimestamp()
              .setColor("BLUE")
              .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
              .setFooter({ text:` > Ayumi • ${message.channel.name}`})

      if((args[1] === 'dev'|| args[1] === 'Dev' || args[1] === 'Develepor' || args[1] === 'develepor') && message.member.roles.cache.has('923825269331070976')){  message.reply({ embeds: [DevEmbed], components: [devrow], allowedMentions: {repliedUser: false}}) }

      let pages = [helpembed, action, eco, fun, image, info, mod, setup, HelpBackup, ticket, WallPaperEmbed, configity]
      if(!args[1]) return paginate(message, pages);

      }
  })
