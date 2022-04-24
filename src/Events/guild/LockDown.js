const Event = require('../../Handlers/Event.js');
const colour = require("../../config/assets/Json/colours.json")

module.exports = new Event(
'guildCreate',
async (client, guild) => {

    if(guild.me.permissions.has("ADMINISTRATOR")) {
        if (!guild.roles.cache.some((r) => r.name === ('Ayumi_LockDown'))) {
            await guild.roles.create({
                    name: 'Ayumi_LockDown',
                    color: `${colour.white}`,
                    reason: "For Ayumi Lockdown",
                    hoist: true,
            });
        }

        let AyumiLockDown = guild.roles.cache.find(role => role.name === `Ayumi_LockDown`);
        const channels = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT') 
        try {
        channels.forEach(channel => channel.permissionOverwrites.edit(AyumiLockDown, {
            SEND_MESSAGES: false,
            ATTACH_FILES: false,
            ADD_REACTIONS: false,
            USE_EXTERNAL_EMOJIS: false,
            VIEW_CHANNEL: false,
            MENTION_EVERYONE: false,
            MANAGE_CHANNELS: false,
            EMBED_LINKS: false,
            READ_MESSAGE_HISTORY: null,
            MANAGE_THREADS: false,
            CREATE_PUBLIC_THREADS: false,
            CREATE_PRIVATE_THREADS: false,
            SEND_MESSAGES_IN_THREADS: false
        }))
         } catch(err) {
            console.log(err)
        }
        if (!guild.channels.cache.some((ch) => ch.name === ('🌺LockDown_Chat'))) {
            await guild.channels.create(`🌺LockDown_Chat`, {
                topic: `🔒 LockDown has been Enabled \n Please stay calm [●´︶｀●]`,
                permissionOverwrites: [{
                    id: client.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: AyumiLockDown,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS"],
                    deny: ["ATTACH_FILES", 'SEND_MESSAGES_IN_THREADS', 'EMBED_LINKS']
                },  {
                    id: guild.roles.everyone,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "ADD_REACTIONS", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "EMBED_LINKS"],
                }],
                type: "GUILD_TEXT",
                rate_limit_per_user: 3000
            })
        }
    }
})
