const { Captcha } = require('captcha-canvas');
const { MessageEmbed, MessageAttachment } = require("discord.js");
const CaptchaSchema = require("../../config/models/captcha.js");
const Command = require('../../Handlers/Command.js')
const Discord = require("discord.js")

module.exports = new Command({
  name: 'captcha',
  aliases: ['verify'],
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["ADMINISTRATOR"],
  type: "TEXT",
  cooldown: 7000,
  description: 'complete the captcha to verify yourself',
  async run(message, args, client) {

    const member =  message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member 

    const Vchannel = client.channels.cache.get("924281132235755530")
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

CaptchaSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(!data) return console.log("No data -> verify role has not been set.")
    const role = message.guild.roles.cache.get(data.Role);

     const ALREADYVERFIEDEMBED = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`*Bakaa~* ${message.author} you have already been verified.`)
     .setTitle("You are already verified")

if (member.roles.cache.has(data.Role)) return message.channel.send({embeds: [ALREADYVERFIEDEMBED]})
message.delete()
if (!data) return;
if (data) {
const captcha = new Captcha();
  captcha.async = true;
  captcha.addDecoy(); 
  captcha.drawTrace(); 
  captcha.drawCaptcha();

        const attachment = new MessageAttachment(await captcha.png, "Ikigai_captcha.png")
        const Emb = new MessageEmbed()
        .setImage("attachment://Ikigai_captcha.png")
        .setColor("#FEE4FA")
         .setTitle("Please answer what you see below.")
           const msg = await Vchannel.send({ files: [attachment], embeds: [Emb]})
  const collector = msg.channel.createMessageCollector({
   filter: (m) =>
   m => m.author.id === msg.author.id,
   max: 2,
   time: 60000,
   errors: ["time"],
  });
  collector.on("collect", m => {
    if(m.author.id !== member.id) return;
		const verified = (m.content === captcha.text)
    if(verified) {
    member.roles.add(role)
    client.channels.cache.get("935866768424063046").send({embeds: [verifiedEmbed]}) 
    } if(!verified) {
      try {
    member.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly. Try again by joinging. https://discord.gg/TQ3mTPE7Pf`)
      } catch(error) {
        console.log(error)
      }
    member.kick()
  }
	});
  }
})
  }
})