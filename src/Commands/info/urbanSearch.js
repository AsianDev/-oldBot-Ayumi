const { request } = require('undici')

const Discord = require("discord.js");
const Command = require('../../Structures/Handlers/Command.js')

module.exports = new Command({
    name: "urban-search",
    description: "Search info up",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: "SEND_MESSAGES",
    type: "TEXT",
    aliases: ["ub", "urban"],
    cooldown: 5000,
    async run(message, args, client) {

        if (!args[1]) return message.channel.send("*Waaa~* what do i have to search?"); // Handles empty search queries
        try {
            let res = await request(`https://api.urbandictionary.com/v0/define?term=${args.join(' ')}`).then(r => r.body.json().then(s => s.list)); // Searches on the urban dictionary API

            res = res[0]

            // Replacing [subwords] in definition
            let defmatch = res.definition.match(/\[.*?\]/gm)
            if (defmatch?.length) defmatch.forEach(v => {
                let subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0]
                res.definition = res.definition.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`)
            })
            
            // Replacing [subwords] in example
            let exmatch = res.example.match(/\[.*?\]/gm)
            if (exmatch?.length) exmatch.forEach(v => {
                let subword = v.match(/(?<=\[)[^)]*(?=\])/gm)[0]
                res.example = res.example.replace(v, `[${subword}](https://www.urbandictionary.com/define.php?term=${subword.replace(/ /gm, '%20')})`)
            })

            // Sending the message
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setAuthor({ name: `Urban Dictionary`})
                        .setTitle(res.word)
                        .setURL(res.permalink)
                        .setColor("#134FE6")
                        .addFields(
                            { name: '📖 Definition', value: !res.definition ? 'No Definition' : (res.definition.length > 1022 ? res.definition.substring(0, 1023) : res.definition) },
                            { name: '💬 Examples', value: !res.example ? 'No Definition' : (res.example.length > 1022 ? res.example.substring(0, 1023) : res.example) },
                            { name: '👍 Upvotes', value: res.thumbs_up.toLocaleString() || 'N/A', inline: true },
                            { name: '👎 Downvotes', value: res.thumbs_down.toLocaleString() || 'N/A', inline: true }
                        )
                        .setTimestamp(new Date(res.written_on).getTime())
                        .setFooter({ text: `Written by ${res.author || "unknown"}`})
                ]
            })
        } catch (err) {
            // Handles Errors
            message.channel.send('An error occured');
            console.error(err);
        }
    }
})