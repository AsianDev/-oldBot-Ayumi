const Discord = require("discord.js");
const Command = require('../../Handlers/Command.js')

let ips = [
  '14.621.152.163.87.5',
  '96.492.139.149.12.8',
  '84.424.522.985.24.1',
  '82.245.242.874.83.13',
  '91.532.981.149.25.1',
  '24.123.091.134.24.4',
  '82.244.251.142.15.9',
  '21.981.847.109.12.3',
  '69.420.360.360.21.9',
	'87.242.081.018.24.6'
];

let passwords = [
'AnimeFan92',
'H*ntai',
'I❤️Sakura',
'Simp101Lessons',
'1337',
'IronAmerica69',
'Spiderman no way hom',
'uchiha deku',
'overflow<3',
'yourmum',
'sandwichGoblin',
'luffyXsasuke',
'hax',
];


let emails = [
	`❤️hent*i@outlook.com`,
	`isdumbdumb@gmail.com`,
	`@yahoo.com`,
  `@isdumb.io`,
	`@noob.com`,
	`anime@noob.net`,
  `anime❤️@wannabe.com`,
	`hacked@noob.com`,
	`artifical.intelegance@bot.com`,
	`getgood@ha.xyz`,
	`nub.nub@nub.nub`,
	`yes.no@yesnt.exe`,
	`obama@prism.old`,
	`joe@bidome.new`,
	`badpickup@line.tinder`,
];

let ccis = [
	'5430112115445621',
	'9283109176382620',
	'1384378743864386',
	'2473897583563753',
	'3978564875648756',
	'4878567578565787',
	'8573647365736573',
	'7756542654265426',
	'6789768976789878',
	'6942021360420699',
	'9874899483648346',
	'0876578976374634',
	'7374826537265742',
	'942i758265487562',
	'1432874628746328',
	'9876546789098765',
	'8765678908765467',
	'6784932483724232',
	'7867524725278527',
	'8765456789876545',
	'3647284257425423',
    'McDonalds',
    'White House',
];


let names = [
'Josh',
'Joe',
'Liam',
'Oliver',
'Henry',
'James',
'Alexander',
'Hugh jass',
'Mike croch',
'Liam',
'Aria',
'Daniel',
'Sebastian',
'Gabriel',
'Jacob',
'Elias',
'Matthew',
'Diamond',
'Peter',
'Sakura',
'failure',
'ricegobbler',
'Goku',
'Pablo',
'Thomas',
'Greg',
'Lily',
'Elizabeth',
'Bruce',
'Liliana',
'Saori',
'Gwen',
'Ned',
'Peter',
'Mikasa',
'Eren Yeager',
'Niel',
'Bart',
'tanya',
'Kerry',
'h*ntai'
]


module.exports = new Command({
        name: "hack",
        description: "hack a user",
        userPermissions: ["SEND_MESSAGES"],
      botPermissions: "SEND_MESSAGES",
type: "Text",    
        cooldown: 7000,
        aliases: ["hax"],
    async run(message, args, client) {
 const email = emails[Math.floor(Math.random() * emails.length)];
 const password = passwords[Math.floor(Math.random() * passwords.length)];
 const ip = ips[Math.floor(Math.random() * ips.length)];
const cci = ccis[Math.floor(Math.random() * ccis.length)];
const name = names[Math.floor(Math.random() * names.length)];

  const user = message.mentions.users.first() || message.author;

    let text
 = [

      `**Logging into \`\`${user.username}'s\`\` Computer**`,

      `**Loading \`\`Hack.exe\`\` file**`,

      `**Disabling \`\`${user.username}'s\`\` antiVirus**`,

      `**Getting \`\`${user.username}'s\`\` real name**`,
      
      `**\`\`${user.username}'s\`\` real name is : ${name}**`,

      `**Killing \`\`${user.username}'s\`\` Wifi**`,

      `**Watching \`\`${user.username}'s\`\` cry over wifi** `,

      `<:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455>`,

      `**Checking \`\`${user.username}'s\`\` Incognito History**`,

      `**Locating \`\`${user.username}'s\`\` Details**`,

      `**Preparing to reveal Details** `,

      `**\`\`${user.username}'s\`\` Email : ${user.username}${email}**`,

			`**\`\`${user.username}'s\`\` password : ${password}**`,

      ` **\`\`${user.username}'s\`\` Ip : ${ip}**`,

      `<:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455>`,

			` **Checking \`\`${user.username}'s\`\` bank account **`,

      `**\`\`${user.username}'s\`\` credit card number : ${cci}**`,

      `<:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455><:line:927733711431143455>`,

      `**Uploading all information \`\`${user.username}\`\` to the Dark Web**`,

      `**Removing Traces of hacking \`\`${user.username}\`\`**`,


    ];

    let current = 0;
    let count = text
.length;
    let editTime = 2000;

    message.channel.send(`\`\`\`ini\n[ **Kao-chan has begun to hack** ${user.username} ]\`\`\``).then ((msg) => {

      let interval = setInterval(() => {

        if (current === count) {
          msg.edit(`\`\`\`ini\n[ **Kao-chan has hacked ${user.username} without error** ]\`\`\``);
          clearInterval(interval);
          return;
        }

        let hackMsg = text
[current];
        msg.edit(hackMsg);
        current++
 
      }, editTime);
    })
  }
})