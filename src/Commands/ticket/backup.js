const backup = require("discord-backup")
backup.setStorageFolder(__dirname + "/backups/")
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
  name: "backup",
  description: 'Backup system',
  type: "TEXT",
  userPermissions: [""],
  owner: true,  
  botPermissions: ["ADMINISTRATOR"],
  aliases: ["back-up", "bkp", "bacup"],
  cooldown: 15000,

  async run(message, args, client) {

    const ownerEmbed = new Discord.MessageEmbed()
    .setColor("DARK_RED")
    .setDescription("*Waa~~* you are not the server owner (._.)")
    .setTitle("<:x_:904736839036993586> An error has occured!")
    .setURL("https://discord.gg/TQ3mTPE7Pf")
    
    const OWNERIDISME = "569670023300382720";

    if(message.author.id !== message.guild.ownerId && message.author.id !== OWNERIDISME) return message.reply({embeds: [ownerEmbed], allowedMentions: {repliedUser: false}})


    // Nobackup Found embed

    const NoBackupFound = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("<:Iki_MAD:874174682427969536> ** *Waaa~* This backup doesnt exist or can not be found. Please make sure the backup's ID is correct.**")

    const actions = ["Create", "Load", "Info", "Delete"]

    const ActionsEmbed = new Discord.MessageEmbed()
    .setColor("BLURPLE")
    .setTitle("I see you need help?")
    .setDescription("Heres how this system works.")
    .addField("Kao backup Create:", "Create's the backup")
    .addField("Kao backup Load:", "Load's the backup")
    .addField("Kao backup Info:", "Gives information on the backup")
    .addField("Kao backup Delete:", "Delete's the backup")

    if(!actions.includes(args[1])) return message.reply({embeds: [ActionsEmbed], ephemeral: true})
    
    // -----------------------------Making the backup-------------------------------------//

    if(args[1] == "Create") {

        backup.create(message.guild, {

            jsonBeautify: true,
            doNotBackup: [ "ban" ], // what u dont want it to save and load -> i disabled emojis and ban cause it takes most of the space and makes it slower.
            maxMessagesPerChannel: 100,

        }).then(async backupdata => {
            
            const SuccessEmbed = new Discord.MessageEmbed()
            .setColor("#FEE4FA")
            .setTitle("<:Info:928913634694955058> The backup is successful!")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`**The backup has been successfully made!**`)
            .addField("To load the backup:", `Use \`Kao Backup Load ${backupdata.id}\` to load the backup.`)
            .addField("To delete the backup:", `Use \`Kao Backup Delete ${backupdata.id}\` to delete the backup.`)
            .setTimestamp()
            .setFooter({ text: "Backup made by Kaori <3"})

            message.reply({embeds: [SuccessEmbed], ephemeral: true })

        })
    }  
    // -----------------------------Loading the backup-------------------------------------//

    if(args[1] === "Load") {

        const backupID = args[2]

        if(!backupID) return message.reply({embeds: [NoBackupFound], ephemeral: true })

        backup.fetch(backupID).then(async () => {

            backup.load(backupID, message.guild).then(() => {

                clearGuildBeforeRestore: true,

                backup.remove(backupID) // this is recommended in the package -> you dont have to have this

            })

        }).catch(err => {

            message.reply({embeds: [NoBackupFound], allowedMentions: {repliedUser: false}})

        })

    }

    // -----------------------------Information on the backup-------------------------------------//

    if(args[1] === "Info") {

        const backupID = args[2]

        if(!backupID) return message.reply({embeds: [NoBackupFound], ephemeral: true })

        backup.fetch(backupID).then((backupInfos) => {


            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;


            let BackupInformationEmbed = new Discord.MessageEmbed()
                .setAuthor({ name: "Backup Information", iconURL: `${message.author.displayAvatarURL()}`})
                .setDescription(`Here is the backup information on **${message.guild.name}**`)
                .addField("Backup ID", `\`\`\`${backupInfos.id}\`\`\``)
                .addField("Server ID", `\`\`\`${backupInfos.data.guildID}\`\`\``)
                .addField("Size", `\`\`\`${backupInfos.size} Kb \`\`\``)
                .addField("Created at", formatedDate)
                .setColor("#FEE4FA")
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dynamic: true }))

            message.reply({embeds: [BackupInformationEmbed], ephemeral: true});
        }).catch((err) => {
            // if the backup wasn't found
        return message.reply({embeds: [NoBackupFound], ephemeral: true })
    
    });
    
    }
    // -----------------------------Deleting the backup-------------------------------------//


    if(args[1] === "Delete") {

        const backupID = args[2]

        const RemovedBackupEmbed = new Discord.MessageEmbed()
        .setColor("#FEE4FA")
        .setTitle("Successfully removed the Backup.")
        .setDescription("I have successfully deleted the backup information")


        if(!backupID) return message.reply({embeds: [NoBackupFound], ephemeral: true })

        backup.remove(backupID).then((backupInfos) => {

            message.reply({embeds: [RemovedBackupEmbed]})

        }).catch((err) => {
            // if the backup wasn't found

        return message.reply({embeds: [NoBackupFound], ephemeral: true })
         })
      }
    }
})