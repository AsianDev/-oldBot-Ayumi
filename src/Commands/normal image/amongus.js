const Discord = require("discord.js");
const Command = require ("../../Handlers/Command.js");

module.exports = new Command({
name: "amongus",
description: "amongus",
userPermissions: ["SEND_MESSAGES"],
botPermissions: ["ADMINISTRATOR"],
type: "TEXT",
cooldown: 7000,
async run(message, args, client) {
    const Susembed = new Discord.MessageEmbed()
    .setColor("DARK_AQUA")
    .setDescription(`
    :black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:
    :black_large_square::red_square::red_square::red_square::black_large_square::black_large_square::yellow_square::yellow_square::yellow_square::black_large_square::interrobang::black_large_square::black_large_square:
    :black_large_square::red_square::blue_square::blue_square::black_large_square::black_large_square::yellow_square::blue_square::blue_square::black_large_square::black_large_square::black_large_square::black_large_square:
    :black_large_square::red_square::red_square::red_square::knife::black_large_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square:
    :black_large_square::red_square::black_large_square::red_square::black_large_square::black_large_square::yellow_square::black_large_square::yellow_square::black_large_square::black_large_square::green_square::blue_square:
    :black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::bone::green_square::green_square:`)
message.channel.send({embeds: [Susembed]})
}})