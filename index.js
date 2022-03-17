/** @format */
console.clear();
const Client = require("./src/Structures/Handlers/Client.js")
const mongoose = require('mongoose')
const Discord = require("discord.js")
const config = require("./src/config/Data/config.json")
const Canvas = require("canvas")
const { registerFont } = require("canvas")
registerFont( "./src/config/assets/fonts/Anton-Regular.ttf", { family: 'Anton' })
const chalk = require("chalk")
// ---------------------CANVAS WELCOME AND LEAVE-------------------------- //
var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px Anton';
welcomeCanvas.context.fillStyle = '#FFFFFF';
Canvas.loadImage('./src/config/assets/image/Ikigai_Welcome.jpg').then(async (image) => {
  welcomeCanvas.context.drawImage(image, 0, 0, 1024, 500)
  welcomeCanvas.context.fillText("Welcome", 360, 360);
  welcomeCanvas.context.beginPath();
  welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  welcomeCanvas.context.stroke()
  welcomeCanvas.context.fill()
})
var leaveCanvas = {};
leaveCanvas.create = Canvas.createCanvas(1024, 500)
leaveCanvas.context = leaveCanvas.create.getContext('2d')
leaveCanvas.context.font = '72px Anton';
leaveCanvas.context.fillStyle = '#FFFFFF';
Canvas.loadImage('./src/config/assets/image/leave.jpg').then(async (image) => {
  leaveCanvas.context.drawImage(image, 0, 0, 1024, 500)
  leaveCanvas.context.fillText("Goodbye", 360, 360);
  leaveCanvas.context.beginPath();
  leaveCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  leaveCanvas.context.stroke()
  leaveCanvas.context.fill()
})
const client = new Client()
client.slashCommands = new Discord.Collection();

// // ---------------------ERROR HANDLER-----------------------------------//
process.on("unhandledRejection", (error, promise) => {
  const unhandledRejectionEmbed = new Discord.MessageEmbed()
      .setTitle("<:Iki_Sakura:897357779956793356> AN ERROR OCCURED!")
      .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
      .setDescription(" <:Iki_xpinkdot:916869194400796772> [𝘼𝙉𝙏𝙄-𝘾𝙍𝘼𝙎𝙃] <:Iki_xpinkdot:916869194400796772> ")
      .addField("Errror:", `\`\`\`${error}\`\`\``)
      .addField("Promise", `\`\`\`${promise}\`\`\``)
      .setTimestamp()
      .setColor("#4D9AE6")
      console.log(error)
      const m = client.channels.cache.get("937922889808740373")
      if(!m) return;
      m.send({embeds: [unhandledRejectionEmbed]})})
      //------------------------MONGOOSE-----------------------------//
mongoose.connect(config.MongooseUrl, {
    useUnifiedTopology : true,
    useNewUrlParser:  true,
}).then(console.log(chalk.red.bold(`Connected to the DB`)))
client.start(config.Token).catch((err) => console.log(err))
