/** @format */
console.clear();
const Client = require("./src/Handlers/Client.js")
const mongoose = require('mongoose')
const Discord = require("discord.js")
const Canvas = require("canvas")
const { registerFont } = require("canvas")
registerFont( "./src/util/assets/fonts/Anton-Regular.ttf", { family: 'Anton' })
const dotenv = require("dotenv")
dotenv.config();
// ---------------------CANVAS WELCOME AND LEAVE-------------------------- //
var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px Anton';
welcomeCanvas.context.fillStyle = '#FFFFFF';
Canvas.loadImage('./src/util/assets/image/Ikigai_Welcome.jpg').then(async (image) => {
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
Canvas.loadImage('./src/util/assets/image/leave.jpg').then(async (image) => {
  leaveCanvas.context.drawImage(image, 0, 0, 1024, 500)
  leaveCanvas.context.fillText("Goodbye", 360, 360);
  leaveCanvas.context.beginPath();
  leaveCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  leaveCanvas.context.stroke()
  leaveCanvas.context.fill()
})
// ---------------------ERROR HANDLER-----------------------------------//
const client = new Client({
  restTimeOffset : 0,
  shards: "auto"
})
client.slashCommands = new Discord.Collection();
process.on("unhandledRejection", (error, promise, origin) => {
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
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology : true,
    useNewUrlParser:  true,
}).then(console.log('Connected to the Database.'))
client.login(process.env.TOKEN)
