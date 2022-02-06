const Discord = require('discord.js');
const ms = require('ms')
const Command = require('../../Handlers/Command.js')
const Color = `#FCC8EA`;
let timerSchema = require("../../config/models/reminder");
module.exports = new Command({ 
  name: 'remind',
  premium: true,
  userPermissions: [""],
  botPermissions: ["ADMINISTRATOR"],
  description: 'reminds you about what will you do!',
  type: "TEXT",
  cooldown: 5000,
  aliases: ["reminder"],

  async run(message, args, client) {
    
    
        if (!args[1] || !["set", "delete", "list"].includes(args[1])) {
          let infoEmbed = new Discord.MessageEmbed()
            .setTitle(`Timer Sub-Commands`)
            .addField(`Kao reminder set`, `Usage: Kao reminder set <duration> <reason>`)
            .addField(`Kao reminder delete`, `Usage: Kao reminder delete <timer id>`)
            .addField(`Kao reminder list`, `Usage: Kao Reminder list`)
            .setColor(Color);
          return message.channel.send({ embeds: [infoEmbed] });
        }
    
        let subcmd = args[1].toLowerCase();
    
        let dmbtn = new Discord.MessageButton()
          .setCustomId("LOCATION_DM")
          .setLabel(`Dm`)
          .setStyle(`PRIMARY`)
          .setEmoji("🔔");
    
        let chbtn = new Discord.MessageButton()
          .setCustomId("LOCATION_CHANNEL")
          .setLabel(`Channel`)
          .setStyle(`PRIMARY`)
          .setEmoji("🔔");

          const NoDurationEmbed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription("*Waaa~* how long is this reminder going to be for?")
          .setTitle("<:Ikix:904736839036993586> MISSING ARGUEMENT")

          
          const NoReasonEmbed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription("*Waaa~* What is this reminder going to be for?")
          .setTitle("<:Ikix:904736839036993586> MISSING ARGUEMENT")
      
        let locationRow = new Discord.MessageActionRow().addComponents(dmbtn, chbtn);
    
        if (subcmd == "set") {
          if (!args[2]) return message.reply({embeds: [NoDurationEmbed], allowedMentions: {repliedUser: false}});
    
          let duration = Math.floor(ms(args[2]) / 1000.0);
    
          if (!args[3]) return message.reply({embeds: [NoReasonEmbed], allowedMentions: {repliedUser: false}});
    
          let reason = args.slice(3).join(" ");
    
          let params = {
            user: message.author.id,
            guild: message.guild.id,
            endsAt: Math.floor(new Date().getTime() / 1000.0) + duration,
            channel: message.channel.id,
            reason,
            duration,
          };
    

          const Where = new Discord.MessageEmbed()
          .setColor("BLURPLE")
          .setDescription("Where do you wish to be notifed when your timer finishes?")

          let sentMsg = await message.reply({
            embeds: [Where],
            components: [locationRow],
            allowedMentions: {repliedUser: false}
          });
    
          let clctor = sentMsg.createMessageComponentCollector({
            time: 60000,
          });
    
          let disabledRow = new Discord.MessageActionRow().addComponents(
            dmbtn.setDisabled(true).setStyle(`SECONDARY`),
            chbtn.setDisabled(true).setStyle(`SECONDARY`)
          );
    
          clctor.on("collect", (i) => {
            const id = i.customId;
    
            if (i.user.id !== message.author.id)
              return i.reply({
                content: "this is not for you..",
                ephemeral: true,
              });
    
            if (id == "LOCATION_DM") {
              clctor.stop("dm");
            } else if (id == "LOCATION_CHANNEL") {
              clctor.stop("channel");
            }
          });
    
          clctor.on("end", async (i, reason) => {
            if (reason == "time") {
              sentMsg.edit({ components: [disabledRow] });
            } else {
              params.location = reason;
              let create = await timerSchema.create(params);
              let embed = new Discord.MessageEmbed()
                .setTitle(`Reminder set!`)
                .setDescription(
                  `I will remind you in ${
                    reason == "dm" ? "your dms" : "this channel"
                  } for \`${params.reason}\` in **${ms(duration * 1000, {
                    long: true,
                  })}**!`
                )
                .setColor(Color)
                .setFooter({ text: `Your timer id: ${create._id}`});
              if (create)
                return sentMsg.edit({
                  components: [],
                  embeds: [embed],
                  content: "**Your reminder**",
                });
            }
          });
        }
    
        if (subcmd == "delete") {
          if (!args[2])
            return message.channel.send(
              `<:Ikix:904736839036993586> | Please specify a timer id to delete`
            );
          let timerID;
          try {
            timerID = await timerSchema.findOne({
              _id: args[2],
            });
          } catch (e) {
            return message.channel.send(`That timer id doesnt exist`);
          }
    
          if (
            timerID &&
            timerID.user !== message.author.id &&
            !message.member.permissions.has("ADMINISTRATOR")
          )
            return message.channel.send(`This timer isnt yours!`);
    
          let deleted = await timerSchema.findOneAndDelete({
            _id: args[2],
          });

          const TdeletedEmbed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(`Your timer for \`\`${reason}\`\` has been removed!`)
          if (deleted) return message.channel.send({embeds: [TdeletedEmbed]});
        }
    
        if (subcmd == "list") {
          let found = await timerSchema.find({
            user: message.author.id,
          });

          const noTimerActive = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription("*Bakaa~* you dont have any timers right now!")
    
          if (!found || found.length == 0)
            return message.channel.send({embeds: [noTimerActive]});
          let desc = found.map((v, i) => {
            return `\`(#${i + 1})\` - **${v.reason}** (<t:${
              v.endsAt
            }:R>)\n**ID:** ${v._id}`;
          });
          let embed = new Discord.MessageEmbed()
            .setTitle(`Your reminder history:`)
            .setDescription(`${desc.join("\n\n")}`)
            .setColor(Color)
            .setFooter({ text: `${message.author.username}'s reminders`})
          message.channel.send({ embeds: [embed] });
        }
      },
    });
    