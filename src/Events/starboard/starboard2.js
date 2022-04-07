const Discord = require("discord.js")
const Event = require('../../Handlers/Event.js')
const starCount = "4"; // The star count
const SBchannelId = "928847149310042144" // Starboard channel ID

module.exports = new Event("messageReactionRemove", async (client, reaction) => {

    const starBoardChannel = client.channels.cache.get(SBchannelId)

    const msgs = await starBoardChannel.messages.fetch({ limit: 50 });

    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }

    if (reaction.message.channel.type === "DM") return;
    if (reaction.emoji.name !== "⭐") return;
    if (reaction.emoji.name === "⭐") {

        const SentMessage = msgs.find(msg =>
            msg.embeds.length === 1 ?
                (msg.embeds[0].footer.text.endsWith(reaction.message.channel.name) ? true : false) : false)


        if (SentMessage) {

            if (reaction.count >= starCount) {

                await SentMessage.edit(`:star: **${reaction.count}** ● ${reaction.message.channel}`);

            } else {

                await SentMessage?.delete()

            }
        } else {
            return;
        }
    }

})
