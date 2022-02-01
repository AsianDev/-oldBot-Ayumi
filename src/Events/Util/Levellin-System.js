/** @format */

const Event = require("../../Handlers/Event.js");
const Discord = require("discord.js")
const Levels = require("discord-xp")
const { mongooseConnectionString } = require("../../util/Data/config.json");
Levels.setURL(mongooseConnectionString)
module.exports = new Event("messageCreate", async (client, message) => {
    if(message.author.bot) return;
    if(!message.guild) return;
// xp
    const randomxp = Math.floor(Math.random()* 10) + 1;
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    if(hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congrats <@${message.author.id}> you have leveled up to level **${user.level}** <a:KumaDance:922596036164345926>`)
    }
})