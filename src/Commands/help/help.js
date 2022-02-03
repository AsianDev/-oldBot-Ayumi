const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const Command = require("../../Handlers/Command.js");

module.exports = new Command({
  name: 'help',
  description: "help command",
  type: "TEXT",
  cooldown: 3000,
  aliases: ["he;p", "jelp", "h", "hejkl", "holp"],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  async run(message, args, client) {

    const helpembed = new Discord.MessageEmbed()
        .setTitle("Please select a specific help section.")
        .setURL("https://discord.gg/TQ3mTPE7Pf")
        .addField('Catergory', " 🎬 ``Action``\n  😜 ``Fun`` \n 🎁 ``Giveaway``\n 🖼️ ``Image`` \n  <:Iki_info:938937122931503194> ``Information``\n  🛡️ ``Moderation``\n 🗒️ ``Setup``\n <:Links:904222183813947463> ``Support``\n ✅ ``Utility``\n Do **Kao help <catergory**> to show the help catergory.\n\n   **|** [**Discord**](https://discord.gg/TQ3mTPE7Pf)  **|** [**Vote**](https://top.gg/servers/873143392488525834)", false)
        .setFooter({ text: `Requested by ${message.author.tag} • ${client.commands.size} Commands in total`})
        .setColor("#FCAEEB")
        .setThumbnail(message.member.user.displayAvatarURL({dynamic: true, size: 2048,}))
        const row = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )
       if(!args[1]) {  message.reply({embeds: [helpembed], components: [row], allowedMentions: {repliedUser: false}}) }

const action = new Discord.MessageEmbed()
.setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
.setDescription("```yaml\n Syntax: Kao <Roleplay Command>```")
.addField('__🎎 ACTIONS__', '\`\`\`ini\n[ amazing, bite, blush, boop, confused, cook, cry, cuddle, dance, die, dodge, drive, eat, facedesk, goodnight, happy, hide, highfive, hug, kill, kiss, laugh, lick, mad, nervous, nom, nosebleed, pat, poke, punch, run, sad, scream, shocked, slap, sleepy, smile, stare, stomp, tease, think, thumbsup, tickle, vomit, waifu, wave, wink, yeet ]\n\`\`\`')
.setTimestamp()
.setColor("BLUE")
.setThumbnail(message.member.user.avatarURL({ dynamic: true }))
.setFooter({ text:` > Kaori • ${message.channel.name}`})
const newRow = new Discord.MessageActionRow()        
  .addComponents(
    new Discord.MessageButton()
    .setURL("https://top.gg/servers/873143392488525834")
    .setLabel("Vote for Ikigai")
    .setStyle("LINK")
    )

    const fun = new Discord.MessageEmbed()
       .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
        .setDescription("```yaml\n Syntax: Kao <Fun Command>```")
        .addField('__😜 FUN COMMANDS__', '\`\`\`ini\n[ 8ball, anime-search, baka, clyde, coinflip, dare, flip, hack, howotaku, lyrics, meme, motivate, password, pp, screenshot, reddit, ship, translate, truth, weather, wwn ]\n\`\`\`')
        .setTimestamp()
        .setColor("BLUE")
        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setFooter({ text:` > Kaori • ${message.channel.name}`})
        const Funrow = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )
        const giveaway = new Discord.MessageEmbed()
        .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
        .setDescription("```yaml\n Syntax: Kao <Giveaway Command>```")
          .addField('`__🎉 GIVEAWAY__', '```Start```')
          .addField('More info->', "```Kao giveaway explain```")
          .setTimestamp()
          .setColor("BLUE")
          .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
          .setFooter({ text:` > Kaori • ${message.channel.name}`})
          const GiveawayRow = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )
         const image = new Discord.MessageEmbed()
         .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
         .setDescription("```yaml\n Syntax: Kao <Image Command>```")
          // normal
          .addField('__🖼️ IMAGES__', '\`\`\`ini\n [ amongus, captcha simp-card, cat, dog, panda, wallpaper  ]\n\`\`\`')
       //filter
          .addField('__🖼️ FILTER IMAGE__', '\`\`\`ini\n [ blur, blurple, circle, deepfry, emboss, glitch, greyscale, invert, magik, rainbow, sepia, sharpen ]\n\`\`\`')
         // image gen
          .addField('__🖼️ IMAGE GENERATION__', '\`\`\`ini\n[ 3000yrs, approved, beautiful, brazzers, burn, challenger, crush, fire, jail, missionpassed, ps4, rip, scary, symmetry, tatoo, triggered, wanted, wasted ]\n\`\`\`')
          .setTimestamp()
          .setColor("BLUE")
          .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
          .setFooter({ text:` > Kaori • ${message.channel.name}`})
          const ImageRow = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )
            const info = new Discord.MessageEmbed()
            .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
            .setDescription("```yaml\n Syntax: Kao <Information Command>```")
            .addField('__❓ INFORMATION__', '\`\`\`ini\n[ avatar, bot-info, firstmsg, guildinvite, imdb-search, membercount, oldest, owner, ping, userinfo, urban, user-search, whois, youngest ]\n\`\`\`')
            .setTimestamp()
            .setColor("BLUE")
            .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
            .setFooter({ text:` > Kaori • ${message.channel.name}`})
            const InforROw = new Discord.MessageActionRow()        
              .addComponents(
                new Discord.MessageButton()
                .setURL("https://top.gg/servers/873143392488525834")
                .setLabel("Vote for Ikigai")
                .setStyle("LINK")
                )
              const mod = new Discord.MessageEmbed()
              .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
              .setDescription("```yaml\n Syntax: Kao <Moderation Command>```")
              .addField('__🛡️ MODERATION__', '\`\`\`ini\n [ ban, clear, dm, blist, kick, lock, mod-nick, mute, nick, remove-allwarns, remove-timeout, remove-warn, reset-nick, role-info, steal-emoji, timeout, unban, unlock, unmute, warn, warnings ]\n\`\`\`')
              .addField('__👑 ADMINSTRATION__', '\`\`\`ini\n[ channel-create, channel-delete, create-role, create-vc, announce, give-role, mass-add-role, mass-remove-role, channel-nuke, slowmode ]\n\`\`\`')
              .addField('__🎉 EVENTS__', '\`\`\`ini\n[ gtn ]\n\`\`\`')
              .setTimestamp()
              .setColor("BLUE")
              .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
              .setFooter({ text:` > Kaori • ${message.channel.name}`})
              const Modrow = new Discord.MessageActionRow()        
                .addComponents(
                  new Discord.MessageButton()
                  .setURL("https://top.gg/servers/873143392488525834")
                  .setLabel("Vote for Ikigai")
                  .setStyle("LINK")
                  )
                const setup = new Discord.MessageEmbed()
                .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                .setDescription("```yaml\n Syntax: Kao <Setup Command>```")
                .addField('__🗒️ SET CHANNEL__', '\`\`\`ini\n[ set-boostchannel, set-leavechannel, set-suggestchannel, set-welcomechannel ]\n\`\`\`')
                .addField('__🗒️ OTHER__', '\`\`\`ini\n[ disable-command, enable-command, reset-mute, reset-remove, sremove, set-autorole, setmuterole, setverifyrole]\n\`\`\`')
                .setTimestamp()
                .setColor("BLUE")
                .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                .setFooter({ text:` > Kaori • ${message.channel.name}`})
                const setupRow = new Discord.MessageActionRow()        
                  .addComponents(
                    new Discord.MessageButton()
                    .setURL("https://top.gg/servers/873143392488525834")
                    .setLabel("Vote for Ikigai")
                    .setStyle("LINK")
                    )
                    const ticket = new Discord.MessageEmbed()
                    .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                    .setDescription("```yaml\n Syntax: Kao <Support Command>```")
                    .addField('__📨 SUPPORT__', '\`\`\`ini\n[ report, ticket, backup ]\n\`\`\`')
                    .addField("For more help with backup commands:", "Run ``kao help backup``")
                    .setTimestamp()
                    .setColor("BLUE")
                    .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                    .setFooter({ text:` > Kaori • ${message.channel.name}`})
                    const ticketRow = new Discord.MessageActionRow()        
                      .addComponents(
                        new Discord.MessageButton()
                        .setURL("https://top.gg/servers/873143392488525834")
                        .setLabel("Vote for Ikigai")
                        .setStyle("LINK")
                        )

                        const HelpBackup = new Discord.MessageEmbed()
                        .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                        .setDescription("```yaml\n Syntax: Kao <Backup Command>```")
                        .addField('__⚙️ BACKUP__', '\`\`\`[ Backup Create, Backup Load, Backup Info, Backup Delete ]\n\`\`\`')
                        .setTimestamp()
                        .setColor("BLUE")
                        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                        .setFooter({ text:` > Kaori • ${message.channel.name}`})
                        const BackupRow = new Discord.MessageActionRow()        
                          .addComponents(
                            new Discord.MessageButton()
                            .setURL("https://top.gg/servers/873143392488525834")
                            .setLabel("Vote for Ikigai")
                            .setStyle("LINK")
                            )

                  const utility = new Discord.MessageEmbed()
                  .setAuthor({ name: "KAORI HELP MENU", iconURL: `${client.user.displayAvatarURL()}`})
                  .setDescription("```yaml\n Syntax: Kao <Utility Command>```")
                  .addField('__✅ MISC__', '\`\`\`ini\n[ afk, poll, report-bug, review, servericon serverinfo, suggest, timestamp ]\n\`\`\`')
                  .setTimestamp()
                  .setColor("BLUE")
                  .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
                  .setFooter({ text:` > Kaori • ${message.channel.name}`})
                  const Utilrow = new Discord.MessageActionRow()        
            .addComponents(
              new Discord.MessageButton()
              .setURL("https://top.gg/servers/873143392488525834")
              .setLabel("Vote for Ikigai")
              .setStyle("LINK")
              )

  if(args[1] === 'action' || args[1] === 'roleplay' || args[1] === 'Action' || args[1] === 'Roleplay' || args[1] === 'Anime' || args[1] === 'anime'){  message.reply({ embeds: [action], components: [newRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'fun'|| args[1] === 'Fun'){  message.reply({ embeds: [fun], components: [Funrow], allowedMentions: {repliedUser: false}}) }
  else if(args[1] === 'giveaway'|| args[1] === 'giveaway'){  message.reply({ embeds: [giveaway], components: [GiveawayRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'image' || args[1] === 'pictures' || args[1] === 'Image' ){  message.reply({ embeds: [image], components: [ImageRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'info' || args[1] === 'Info' || args[1] === 'information' || args[1] === 'Information'){  message.reply({ embeds: [info], components: [InforROw], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'mod' || args[1] === 'moderation' || args[1] === 'Moderation' || args[1] === 'Mod' || args[1] ===  "Adminstrator" || args[1] ===  "Admin" || args[1] === "adminstrator" || args[1] ===  "admin"){  message.reply({ embeds: [mod], components: [Modrow], allowedMentions: { repliedUser: false }})}
  else if(args[1] === 'setup'|| args[1] === 'Setup'){  message.reply({ embeds: [setup], components: [setupRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'Backup'|| args[1] === 'backup'){ message.reply({ embeds: [HelpBackup], components: [BackupRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'ticket'|| args[1] === 'Support'|| args[1] === 'support' || args[1] === 'Ticket'){  message.reply({ embeds: [ticket], components: [ticketRow], allowedMentions: { repliedUser: false }}) }
  else if(args[1] === 'utility' || args[1] === 'Utility' || args[1] === 'util'){  message.reply({ embeds: [utility], components: [Utilrow], allowedMentions: { repliedUser: false }}) 
          }
        }
  });