const Command = require('../../Handlers/Command.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({

  name: 'nuke',
  description: "deletes and clones the channel",
  aliases: ["Bomb", "nuclear"],
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["ADMINISTRATOR"],
  type: "Text",
    cooldown: 4000,
   async run(message, args, client) {
    if (message.channel.type !== 'GUILD_TEXT') return message.channel.send('*Bakaa* i can only nuke text channels.')
 let nukeButton = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("YES").setStyle("SUCCESS").setLabel("Continue"),

    new MessageButton().setCustomId("NO").setStyle("DANGER").setLabel("Cancel")
  );
  let reason = args.slice(1).join(" ") || "*Waaa~* No reason has been provided to this nuke!";

  const AYS = new MessageEmbed()
  .setColor("#36393f")
  .setDescription("**Are you sure you wish to nuke this channel?**")
  .setAuthor({ name: "Please Confirm!", iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
  message.reply({
    embeds: [AYS],
    components: [nukeButton],
    allowedMentions: {repliedUser: false}
  });
  const filter = (interaction) => {
    if (interaction.user.id === message.author.id) return true;
    return interaction.reply({
      content: "*Waaa~* This is not for you to interact! o.o",
      ephemeral: true,
    });
  };

  const collector = message.channel.createMessageComponentCollector({
    filter,
    max: 1,
  });

  collector.on("collect", (buttonInteraction) => {
    const id = buttonInteraction.customId;

    if (id === "YES") {
      message.channel.clone().then((ch) => {
        let NukedSuccessEmbed = new MessageEmbed()
        .setTitle("**Channel Succesfuly Nuked**")
        .setColor("BLURPLE")
        .setDescription(reason)
        .setImage("https://i.gifer.com/Hgp9.gif");

        ch.setPosition(message.channel.position);
          message.channel.delete().then(() => {
          ch.send({ embeds: [NukedSuccessEmbed] }).then((msg) => {
            setTimeout(() => msg.delete(), 12000);
          });
        });
      });
    }
    if (id === "NO") {
      return message.channel.bulkDelete("1", true).then(message.react("<:Yees:874174668305747968>"));
    }
  });
}})