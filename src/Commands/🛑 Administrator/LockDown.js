const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const LockDownDB = require("../../config/models/LockDownDB")
const colour = require("../../config/assets/Json/colours.json")
const emote = require("../../config/assets/Json/emotes.json")

module.exports = new Command({

    name: 'lockdown',
    description: 'Protect the server with anti raid!',
    type: 'Slash',
    userPermissions: "ADMINISTRATOR",
    botPermissions: "MANAGE_GUILD",
    slashCommandOptions: [
        {
            name: "state",
            description: "The state of lockdown:",
            type: "BOOLEAN",
            required: true
        },
        {
            name: "reason",
            description: "Why are we enabling/disabling lockdown?",
            type: "STRING",       
        }
    ],
    cooldown: 5000,

    async run(interaction, args, client) {

        const { guild } = interaction;

        const Choice = interaction.options.getBoolean('state')
        const Reason = interaction.options.getString("reason") || "no specified reason";

        const data = await LockDownDB.findOne({ GuildId: guild.id }) 
        const role = guild.roles.cache.find(role => role.name === `Ayumi_LockDown`);
        if(!role) await guild.roles.create({
            name: 'Ayumi_LockDown',
            color: `${colour.white}`,
            reason: "For Ayumi Lockdown",
            hoist: true,
    });

     if(Choice) {
        interaction.guild.members.cache.filter(member => !member.user.bot).map(a => a.roles.add(role));

        try {
        let channel = guild.channels.cache.some(channel => channel.name === '🌺LockDown_Chat')
        let AyumiLockDown = guild.roles.cache.find(role => role.name === `Ayumi_LockDown`);

        if(!channel) channel = await interaction.guild.channels.create(`🌺LockDown_Chat`, {
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
        

        channel.send({ embeds: [new Discord.MessageEmbed()
            .setColor(colour['light red'])
            .setTitle(`<a:kao_ChickaSpin:950002046629740555> You are now Safe!`)
            .setDescription(`<@${interaction.user.id}> has put the server into lockdown mode!`)
            .addField("Reason to Lockdown:", `${Reason}`)
            .addField("Server Name:", `${guild.name}`, true)
            .addField("Humans:", `\`${guild.members.cache.filter(member => !member.user.bot).size}\``, true)
            .setThumbnail(`${interaction.guild.iconURL()}`)
        ]})

        if (!data) {
        try {
            const data1 = await LockDownDB.create({
                GuildId: guild.id,
                EnabledOrDisabled: Choice,
                Reason: Reason
            })

            await data1.updateOne({ EnabledOrDisabled: Choice })
        } catch (error) {
            console.log(error)
        }
    }
           
    return interaction.followUp({ embeds: [new Discord.MessageEmbed()
                .setColor(colour['light red'])
                .setTitle(`${emote.Tick} Enabled Lockdown`)
                .setDescription(`Lockdown has been Enabled`)
            ]})
       
        } catch(err) {
            console.log(err)
        }
    } else if(!Choice) {
        try {
        interaction.guild.members.cache.filter(member => !member.user.bot).map(a => a.roles.remove(role));

        if (data) {
            await data.updateOne({ EnabledOrDisabled: Choice })
            return interaction.followUp({ embeds: [new Discord.MessageEmbed()
                .setColor(colour.pink)
                .setTitle(`${emote.Tick} Disabled Lockdown`)
                .setDescription(`Lockdown has been Disabled`)
                  ]})
                }
            } catch(err) {
                console.log(err)
            }
        } 

    }
})
