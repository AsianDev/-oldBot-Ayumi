const Discord = require("discord.js");
const flip = require("flip-text");
const Command = require('../../Handlers/Command.js')

module.exports = new Command({
        name: "flip",
        description: "flip you text",
        userPermissions: ["SEND_MESSAGES"],
        botPermissions: "SEND_MESSAGES",
        type: "TEXT",
        cooldown: 3000,
        async run(message, args, client) {
        if (args.length < 2) {
            return message.channel.send("Please enter some text to flip");
          }
          args.reverse();
          var flipped = [];

          args.forEach((arg) => {
            flipped.push(flip(arg));
          });
      
          message.channel.send(flipped.join(" ").replace ("dᴉlɟ", ""));
        },
      })