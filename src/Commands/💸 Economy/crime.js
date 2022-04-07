const Command = require('../../Handlers/Command.js')
const Discord = require('discord.js')
const emotes = require('../../config/assets/Json/emotes.json')
const colour = require('../../config/assets/Json/colours.json')
const DB = require("../../config/models/ecoDB")

module.exports = new Command({

    name: 'crime',
    description: 'Commit a crim for some Meji!  ',
    type: 'Text',
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 4000,
    nsfw: false,
    maintance: true,

    async run(message, args, client) {


        if(await DB.findOne( 
            { 
                userID: message.author.id, 
                isPassive: true
            }
        )) return client.errorEmbed(message, `*Waa~* Please exit out of passive mode to use this command!`);

        let member = message.author

        let ecoData;
        try {
            ecoData = await DB.findOne({
                userID: member.id
            });
        } catch (err) {
            console.log(err);
        }
        if(!ecoData) {
            let ecoDB = await DB.create({
                userID: member.id
            });
            ecoDB.save();
        }

        let AddedToBalMoneyTotal = Math.floor(Math.random() * 530) + 1
        if(AddedToBalMoneyTotal == null) AddedToBalMoneyTotal = 0

        let RemovedMoni = Math.floor(Math.random() * 670) + 1
         if(RemovedMoni == null) RemovedMoni = 0

 
        const success = [
                'You sneak into the local bakery at night. You were able to steal the old bread from the day before and sell it for a moderate sum of Meji.',
                'You stole a devil fruit from the Straw Hat Pirates! While it wasn’t worth a lot, you still managed to get some Meji for it.',
                `You pretend you are able to cook and get employed by an expensive restaurant. All seems to be going well until Soma Yukihira challenges you and you lose. As you leave the restaurant, you take a handful of Meki from the tip jar.`,
                `You helped an old man cross the road, you pick pocketed him and found some sweet sweet Meji!`,
                `You read all the one piece manga and the anime but you never spoilt it to anyone. Ikigai's Owner sent you some Meji!`
         ]
            
            const fails = [
                `You attempt to cheat the Rental Girlfriend system by trying to convince the rental girlfriend to be your real girlfriend. She reports you for harassment and you're fined some Meji.`,
                `You walk into a bank with the intention of robbing it, but almost instantly realize your best friend works there. Feeling bad, you gave your friend some Meji and then left.`,
                `You tried to rob the money off an old lady but she was a trained martial artist and she robbed you of Meji!`,
                `You created multiple alts and had them join Ikigai to farm the daily command. However, you're found out and not only are you banned, but you also lose your Meji.`,
                `You protested against mobey taguire becoming president and Hom Tolland fined you with Meji!`,
                'You watched your lie in april without crying, by law you were fined with Meji!',
            ]

            const both = [success, fails]
            const random = both[Math.floor(Math.random() * both.length)]
            const randum = random[Math.floor(Math.random() * both.length)]

            let beggerEmbed = new Discord.MessageEmbed()
            .setColor(colour.brown)
            
            if(success.includes(randum)) {
                await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: AddedToBalMoneyTotal}}) 
                beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **+${AddedToBalMoneyTotal}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
                beggerEmbed.setFooter({ text: `Added Meji to your balance!`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
                message.channel.send({embeds: [beggerEmbed]})

            } else if(fails.includes(randum)) {
                await DB.findOneAndUpdate({userID: member.id}, {$inc: {wallet: -RemovedMoni}})
                beggerEmbed.setDescription(`\`\`\`${randum}\`\`\`\n **+${RemovedMoni}**<coin_here>\n<:line:927733711431143455><:line:927733711431143455>`)
                beggerEmbed.setFooter({ text: `Removed Meji from your balance!`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}`})
                message.channel.send({embeds: [beggerEmbed]})

            }

    }
})
