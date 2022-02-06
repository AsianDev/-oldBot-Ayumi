const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../util/assets/Json/emotes.json')
const colour = require('../../util/assets/Json/colours.json')
const ytsearch = require("yt-search")
const ms = require("ms")
module.exports = new Command({

    name: "yt-search",
    aliases: ['searchyt', "youtubesearch", "youtube-search", "search-yt", "youtube", "yt", "ytsearch"], 
    description: "Search for a youtube video",
    type: 'TEXT',
    userPermissions: "SEND_MESSAGES",
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
    cooldown: 4000,

    async run(message, args, client) {
  try {
        const query = args.join(" ");
        if (!query)
          return message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor(colour['light red'])
                .setDescription("Please search for a youtube video.")
                .setTimestamp()
                .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
                ], 
            allowedMentions: {repliedUser: false}, 
          });
  
        const res = await ytsearch(query).catch((e) => {
          return message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor(colour['light red'])
                .setDescription("Something went wrong. Please try again later.")
                .setTimestamp()
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                ], 
            allowedMentions: {repliedUser: false},           
    });
        });
  
        const video = res.videos[0];
        if (!video)
          return message.return({
            embeds: [new Discord.MessageEmbed()
                .setColor(colour['light red'])
                .setDescription("Something went wrong. Please try again later.")
                .setTimestamp()
                .setTitle(`${emotes.Error} AN ERROR OCCURED`)
                ], 
            allowedMentions: {repliedUser: false},   
          });

        return message.reply({content: "Searching for the video. <a:loading:938879666800967720>", allowedMentions: {repliedUser: false}}).then((msg) => {
            setTimeout(() => msg.edit({ content: `Found the video! <:Iki_mochaHeart:939483315952578610>\n${video.url}`, allowedMentions: {repliedUser: false} }), ms('3 seconds'))
        })

      } catch (err) {
        console.log(err);
          }
    }
})
