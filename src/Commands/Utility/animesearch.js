const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')
const { MessageEmbed } = require('discord.js');
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();
const emotes = require("../../config/assets/Json/emotes.json")
module.exports = new Command ({
  
  name: "anime",
  type: "TEXT",
  cooldown: 5000,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
  aliases: ["search", "anime-search"],
  description: "Get info about an anime",

  async run(message, args, client) {
  
  
    const noAnimeName = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`${emotes.Error} MISSING ARGUEMENT`)
    .setDescription("*Waa~* Please provide a name of the anime")


    if (!args[1]) {
      return message.channel.send({embeds: [noAnimeName]});
    }
    var search = message.content.split(/\s+/g).slice(2).join(" ");
    kitsu
      .searchAnime(search)
      .then(async (result) => {
        if (result.length === 0) {
          return message.channel.send({content: `No results found for **${search}**!`});
        }

        var anime = result[0];

        let embed = new MessageEmbed()
          .setColor("#FF2050")
          .setAuthor({name: `${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, iconURL: anime.posterImage.original})
          .setDescription(anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0])
          .addField(
            "❯\u2000__Information__",
            `•\u2000\**Japanese Name:** ${
              anime.titles.romaji
            }\n\•\u2000\**Age Rating:** ${
              anime.ageRating
            }\n\•\u2000\**NSFW:** ${anime.nsfw ? "Yes" : "No"}`,
            true
          )
          .addField(
            "❯\u2000__Stats__",
            `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`,
            true
          )
          .addField(
            "❯\u2000__Status__",
            `•\u2000\**Episodes:** ${
              anime.episodeCount ? anime.episodeCount : "N/A"
            }\n\•\u2000\**Start Date:** ${
              anime.startDate
            }\n\•\u2000\**End Date:** ${
              anime.endDate ? anime.endDate : "Still airing"
            }`,
            true
          )

          .setThumbnail(anime.posterImage.original, 100, 200);

        return message.channel.send({ embeds: [embed] });
      })
      .catch((err) => {
        console.log(err); //cathing error
        return message.channel.send({content: `No results found for **${search}**!`});
      });
  },
})