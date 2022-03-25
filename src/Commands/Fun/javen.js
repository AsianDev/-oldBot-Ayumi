const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
    name: "javen",
    description: "its about drive <3",
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 cooldown: 8000,
    async run(message, args, client) {


        let text
 = [

            `**It's about drive**`,
            `**It's about power**`,
            `**We stay hungry**`,
            `**We devour**`,
            `**Put in the work**`,
            `**Put in the hours**`,
            `**and take whats hours**`,
            `**Black and Samoan in my veins**`,
            `**My culture Bangin with Strange**`,
            `**I change the game so whats my motherf*$kin' name!**`,
            `**(What they gonna get tho?)**`,
            `**Desecration, defamation**`,
            `**if you wanna bring it to the masses**`,
            `**Face to face**`,
            `**Now we escalating**`,
            `**When i have to boots to 🍑**`,
            `**Mean on ya, like a dream when im rumblin youre gonna scream mama**`,
            `**So bring drama to King Brahma**`,
            `**Comin at you with extreme mana**`,
      
          ];
      
          let current = 0;
          let count = text
.length;
          let editTime = 1500;
      
          message.channel.send(`\`\`\`ini\n[ beginning to drive ${message.author.username} ]\`\`\``).then ((msg) => {
      
            let interval = setInterval(() => {
      
              if (current === count) {
                msg.edit({embeds: [new Discord.MessageEmbed()
                  .setColor("RED")
                  .setDescription("In memory of <@!724930858473226241> fortnite phase \n Its about drive <3")
                  .setFooter({ text
: "num num", iconURL: `${client.user.displayAvatarURL()}`})
                  .setThumbnail(`${message.author.displayAvatarURL()}`)
                ], content: "You have been drived"})
                clearInterval(interval);
                return;
              }
      
              let hackMsg = text
[current];
              msg.edit(hackMsg);
              current++
       
            }, editTime);
          })
    }})