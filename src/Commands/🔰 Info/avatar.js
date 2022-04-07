const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Command = require('../../Handlers/Command.js')
const fetch = require("axios")
module.exports = new Command({  
    name: "avt",
    description: "Check yourself or user's avatar",
    cooldown: 3000,
    userPermissions: ["SEND_MESSAGES"],
  botPermissions: "SEND_MESSAGES",
 aliases: ["pfp", "avatar", "useravatar", "av"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
     async run(message, args, client) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member ||  message.guild.members.cache.find((u) => u.user.username.toLowerCase().includes(args.join(" ").slice(1) || u.user.tag.toLowerCase() === args.join(" ").slice(1)))

        const png = member.user.displayAvatarURL({ dynamic: false, format: 'png' });
        const jpg = member.user.displayAvatarURL({ dynamic: false, format: 'jpg' });
        const webp = member.user.displayAvatarURL({ dynamic: false, format: 'webp' });
        const gif = member.user.displayAvatarURL({ dynamic: true });
        // const bmp = member.user.displayAvatarURL({ dynamic: false, format: 'bitmap' });

        const avatarMenu = new MessageActionRow().addComponents(
            new MessageSelectMenu({
                placeholder: 'Choose the Image Size',
                customId: 'main',
                options: [
                    {
                        label: '128 pixels',
                        value: "Option 1",
                        emoji: '🖼️',
                    },
                    {
                        label: '256 pixels',
                        value: "Option 2",
                        emoji: '🖼️',
                    },
                    {
                        label: '[Original] 1024 pixels',
                        value: "Option 0",
                        emoji: '🖼️',
                    },
                ]
            }),
        );

        const avtEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Size : 1024px')
            .setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
            .setDescription(`Download Avatar Image At:\n**[png](${png}) | [jpg](${jpg}) | [gif](${gif}) | [webp](${webp})**` || `**[png](${png}) | [jpg](${jpg})**`)

        let avt = await message.channel.send({ embeds: [avtEmbed], components: [avatarMenu] })

        const filter = async interaction => {

            if (interaction.user.id !== message.author.id) {
                interaction.reply({
                    content: "<:Ikix:904736839036993586> **This interaction is not for you.***",
                    ephemeral: true
                });
                return false;
            };
            return true;
        }

        const collector = avt.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',
            time: 50000,
        })

        collector.on('collect', async (menu) => {
            if (menu.values[0] === 'Option 1') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 128px').setImage(member.user.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 0') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 1024px').setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
                    ]
                })
            } else if (menu.values[0] === 'Option 2') {
                menu.update({
                    embeds: [
                        avtEmbed.setTitle('Size : 256px').setImage(member.user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
                    ]
                })
            }
        })

        collector.on('end', async (menu) => {
            avt.edit({ components: [] });
        })
    }
})