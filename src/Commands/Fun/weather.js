const weather = require('weather-js');
const Discord = require('discord.js');
const Command = require('../../Handlers/Command.js')


module.exports = new Command({
    name: 'weather',
    aliases: ["wthr", "whr"],
    type: "TEXT",
    cooldown: 5000,
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    description: "checks the weather of a location",
    async run(message, args, client) {
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('lol i cant check the weather of the earth, please name a location!')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor({text: `Weather forecast for ${current.observationpoint}`})
        .setThumbnail(current.imageUrl)
        .setColor("WHITE")
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', `${current.winddisplay}`, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.channel.send({embeds: [weatherinfo]});    })        
    }
})