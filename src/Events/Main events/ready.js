/**@format */
const Event = require("../../Handlers/Event.js");
const chalk = require("chalk")
const prefix = "Kao"
const Discord = require("discord.js")
const ms = require("ms");
let timerSchema = require("../../util/models/reminder.js")
const colour = require("../../util/assets/Json/colours.json")
module.exports = new Event("ready", (client) => {

    // bot online in console
    console.clear();
    console.log(chalk.green.bold("Success!"))
    console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
    console.log(
      chalk.white("Watching"),
      chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
      chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users," : "User,"}`),
      chalk.red(`${client.guilds.cache.size}`),
      chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
    )
    console.log(
      chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
      chalk.white("||"),
      chalk.red(`${client.commands.size}`),
      chalk.white(`Commands`)
    );
    console.log("")
    console.log(chalk.red.bold("——————————[Statistics]——————————"))
    console.log(chalk.gray(`Running on Node ${process.version} on ${process.platform} ${process.arch}`))
    console.log(chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))


    console.log(
      chalk.hex("#00ceff") ("██╗  ██╗ █████╗  ██████╗ ██████╗ ██╗        ██╗███████╗     ██████╗ ███╗   ██╗██╗███╗   ██╗███████╗      \n"),
      chalk.hex("#dc00ff") ("██║ ██╔╝██╔══██╗██╔═══██╗██╔══██╗██║        ██║██╔════╝    ██╔═══██╗████╗  ██║██║████╗  ██║██╔════╝      \n"),
      chalk.hex("#00ceff") ("█████╔╝ ███████║██║   ██║██████╔╝██║        ██║███████╗    ██║   ██║██╔██╗ ██║██║██╔██╗ ██║█████╗        \n"),
      chalk.hex("#dc00ff") ("██╔═██╗ ██╔══██║██║   ██║██╔══██╗██║        ██║╚════██║    ██║   ██║██║╚██╗██║██║██║╚██╗██║██╔══╝        \n"),
      chalk.hex("#00ceff") ("██║  ██╗██║  ██║╚██████╔╝██║  ██║██║        ██║███████║    ╚██████╔╝██║ ╚████║██║██║ ╚████║███████╗      \n"),
      chalk.hex("#dc00ff") ("╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝        ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝╚══════╝      \n"),
  )
  

        // status
        const arrayOfStatus = [
          `with my friends`,
          "Kao report < user >",
          "with my friends",
          "uwu",
          "with my friends",
          "discord.gg/TQ3mTPE7Pf",
          "with my friends",
      ];
      let index = 0;
      setInterval(() => {
          if(index === arrayOfStatus.length) index = 0;
          const status = arrayOfStatus[index];
          client.user.setStatus('idle');
          client.user.setActivity(status, { type: "PLAYING" })
          index++;
      }, 12000)
  
      // reminder
  setInterval(async () => {
    let timer = await timerSchema.findOne({
      endsAt: Math.floor(new Date().getTime() / 1000.0),
    });
    if (!timer) return;
    if (timer.location == "dm") {
      const user = client.users.cache.get(timer.user);
      const alertembed = new Discord.MessageEmbed()
      .setColor(`${colour["light red"]}`)
      .setTitle('Reminder Alert!')
      .setDescription("Your reminder is now!")
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .addField('⌛| Reminder:', `\`${timer.reason}\`\n **|** [**Discord**](https://discord.gg/TQ3mTPE7Pf)`)
  
      user.send({embeds: [alertembed], content: `<@${user.id}> Your reminder is up!`})
      await timerSchema.deleteOne({
        endsAt: Math.floor(new Date().getTime() / 1000.0),
      });
    } else if (timer.location == "channel") {
      const channel = client.channels.cache.get(timer.channel);
      const user = client.users.cache.get(timer.user);
      const alertembed2 = new Discord.MessageEmbed()
      .setColor(`${colour["light red"]}`)
      .setTitle('Reminder Alert!')
      .setDescription("Your reminder is now!")
      .setThumbnail(user.displayAvatarURL({dynamic: true}))
      .addField('⌛| Reminder:', `\`${timer.reason}\`\n **|** [**Discord**](https://discord.gg/TQ3mTPE7Pf)`)
      .setFooter({ text: `set ${ms(timer.duration * 1000, { long: true })} ago` })

      channel.send({embeds: [alertembed2], content: `<@${user.id}> Your reminder is up!`})

      await timerSchema.deleteOne({
        endsAt: Math.floor(new Date().getTime() / 1000.0),
      });
    }
  }, 1000);
})

/*
client.user.setPresence({
    status: "online", // ➜ idle • online • dnd • invisible
    activity: `Your Text Here`, // Change this ofc
    type: "PLAYING" //➜ PLAYING • LISTENING • WATCHING • COMPETING • STREAMING
    url: "your_twitch_channel_URL" // -------- added this cus we wanted the streaming status
    })
/*/
