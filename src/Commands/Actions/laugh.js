const fetch = require("node-fetch")
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
    name: 'laugh',
    description: "sends laughing images",
    type: "TEXT",
    aliases: ["lol"],
    cooldown: 10000,
    userPermissions: ["SEND_MESSAGES"],
    async run (message, args, client) {
        const member = message.mentions.members.first() || message.author
        const schema = require("../../Structures/models/animeProfileData.js");
    
        let profileData;
        try {
            profileData = await schema.findOne({
                userID: member.id
            });

            if (!profileData) {
                let Data = await schema.create({
                    userID: member.id
                });
                Data.save();
            }
        } catch (err) {
            console.log(err);
        }

await schema.findOneAndUpdate({
                userID: member.id
            }, {
                        $inc: {
                            LaughAmount: 1
                        }
                    });

        let dies = [
            `${message.author.username} hugs ${member}`,
            `${member} has been kissed by ${message.author.username}`,
            `${member} has been kissed! <:Blush:897355536939507712>`,
            `${message.author.username} kisses ${member}`,
            `${member} was kissed by ${message.author.username}`,
        
           ];
           const die = dies[Math.floor(Math.random() * dies.length)];
            if (message.mentions.members.size === 0) {
                fetch(
                    `https://kawaii.red/api/gif/kiss/token=468386640155508737.m2glPraTYnRPNMdEzW8K`)
                    .then(res => res.json()
                        .then(url => {
                            const embed = new Discord.MessageEmbed()
                            .setImage(`${url.response}?size=1024`)
                                .setColor("RANDOM")
                            message.channel.send({ embeds: [embed] })
                        }))
            }
        
            else if (message.mentions.members.size !== 0) {
        

                
    const profileDatas = await schema.findOne({ userID: member.id });
    if(!profileDatas.LaughAmount) return console.log('No laughs for ' + member.user.tag);

                const url = await fetch(`https://kawaii.red/api/gif/kiss/token=468386640155508737.m2glPraTYnRPNMdEzW8K`).then(res => res.json())
                const embed1 = new Discord.MessageEmbed()
                .setImage(`${url.response}?size=1024`)
                .setColor("RANDOM")
                    .setDescription(`**${die}**`)
                    .setFooter({ text: `${member.user.username} has been laughed at ${profileDatas.LaughAmount} times.`})
                message.channel.send({
                    embeds: [embed1]})
            }
        }
        })