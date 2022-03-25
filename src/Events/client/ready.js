/**@format */
const Event = require('../../Handlers/Event.js')
const chalk = require("chalk")
const prefix =  "Ayu"
const Discord = require("discord.js")
const ms = require("ms");
let timerSchema = require("../../config/models/reminder.js")
const colour = require("../../config/assets/Json/colours.json")
const { table } = require("table");
module.exports = new Event("ready", (client) => {
    // bot online in console
    console.clear();
    const data = [
      ["LOGGED IN AS", `${chalk.red.bold(client.user.tag)}`, "Ayumi is a cutie <3"],
      ["SERVERS", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "My servers"],
      ["USERS", `${chalk.green.bold(client.users.cache.size.toLocaleString())}`, "Users i watch over (〃ω〃)"],
      ["TIME", `${chalk.magenta.bold(ms(ms(Math.round(process.uptime() - (client.uptime/1000))+'s')))}`, "Seconds to load bot"],
      ["COMMANDS", `${chalk.blue.bold(client.commands.size.toLocaleString())}`, "My Total Commands"],
      ["VERSION", `${chalk.red.bold(process.version)}`, "My node version"],
      ["MEMORY:", `${chalk.red.bold((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2))} MB`, "My total memory"]
    ]    

    const config = {
      border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,
    
        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,
    
        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,
    
        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
      }, 
      header: {
        alignment: 'center',
        content: "I HAVE LOADED ♡＾▽＾♡"
      }
    };
    console.log(table(data, config))
// old one
/*
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

  /*/


  

   // ------------------ BOT STATUS ----------------- //
        const arrayOfStatus = [
          `with my friends`,
          "Ayu help",
          "with my friends",
          "Boost Ikigai",
          "with my friends",
          "Boost Ikigai",
          "with my friends",
      ];
      let index = 0;
      setInterval(() => {
          if(index === arrayOfStatus.length) index = 0;
          const status = arrayOfStatus[index];
          client.user.setStatus('idle');
          client.user.setActivity(status, { type: "PLAYING" })
          index++;
      }, 15000)
  
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
      .setFooter({ text
: `set ${ms(timer.duration * 1000, { long: true })} ago` })

      channel.send({embeds: [alertembed2], content: `<@${user.id}> Your reminder is up!`})

      await timerSchema.deleteOne({
        endsAt: Math.floor(new Date().getTime() / 1000.0),
      });
    }
  }, 10000);
})

/*
client.user.setPresence({
    status: "online", // ➜ idle • online • dnd • invisible
    activity: `Your text
 Here`, // Change this ofc
    type: "PLAYING" //➜ PLAYING • LISTENING • WATCHING • COMPETING • STREAMING
    url: "your_twitch_channel_URL" // -------- added this cus we wanted the streaming status
    })
/*/
