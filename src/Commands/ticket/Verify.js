const { Captcha } = require('captcha-canvas');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const CaptchaSchema = require("../../Structures/models/captcha.js");
const Command = require('../../Structures/Handlers/Command.js')
const Discord = require("discord.js")
const guildConfig = require('../../Structures/models/guildConfig.js')


module.exports = new Command({
  name: 'verify-captcha',
  aliases: ['verify'],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
  type: "TEXT",
  cooldown: 7000,
  description: 'complete the captcha to verify yourself',
  maintance: true,
  async run(message, args, client) {

    const member = message.member 
    if (member.user.bot) return;
    const data2 = await guildConfig.findOne({Guild: member.guild.id})
    if (!data2) return;
    const Vchannel = member.guild.channels.cache.find(c => c.id === data2.VChannel)
    const NoDm = client.channels.cache.get("925997925925011466")


    const DmsDisabledEmbed = new Discord.MessageEmbed()
    .setDescription(`${member.user.username} does not have their dm's enabled so i could not dm them.`)
    .setTitle("Dms disabled")

    if(message.channel !== Vchannel) return;
    const verifiedEmbed = new Discord.MessageEmbed()
    .setColor("#FEE4FA")
    .setDescription(`Congratulations on passing ${member.user.tag}`)
    .setTitle("A user has verified themself!")
    .addField("User:", `<@${member.user.id}>`)

    const ALREADYVERFIEDEMBED = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`*Bakaa~* ${message.author} you have already been verified.`)
    .setTitle("You are already verified")


  CaptchaSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    const role = message.guild.roles.cache.get(data.Role);
    if (member.roles.cache.has(data.Role)) return message.channel.send({embeds: [ALREADYVERFIEDEMBED]})
    if(!data) return console.log("No data -> Verify role has not been set.")

message.delete()
if (data) {
const captcha = new Captcha();
  captcha.async = true;
  captcha.addDecoy(); 
  captcha.drawTrace(); 
  captcha.drawCaptcha();
  console.log(captcha.text);

        const attachment = new MessageAttachment(await captcha.png, "Ikigai_captcha.png")
        const Emb = new MessageEmbed()
        .setImage("attachment://Ikigai_captcha.png")
        .setColor("#FEE4FA")
         .setTitle("Please answer what you see below.")
           const msg = await Vchannel.send({ files: [attachment], embeds: [Emb]})
    const collector = Vchannel.createMessageCollector({
   filter: (m) => m.author.id === msg.author.id,
   max: 2,
   time: 60000,
   errors: ["time"],
  });
  collector.on("collect", m => {
    if(m.author.id !== member.id) return;
        const verified = (m.content === captcha.text)
    if(verified) {
    member.roles.add(role)
    msg.delete()
    client.channels.cache.get("935866768424063046").send({embeds: [verifiedEmbed]})  // logging that they verified
    } else if(!verified) {
      try {
      member.kick()
    member.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly. Try again by joinging. https://discord.gg/4SV9JYPA`)
      } catch(error) {
        console.log(error)
        NoDm.send({embeds: [DmsDisabledEmbed]})
      }
  }
	});
  }
})
  }
})