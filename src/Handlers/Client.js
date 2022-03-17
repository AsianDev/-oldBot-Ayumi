/** @format */

const Discord = require("discord.js");

const Command = require("./Command.js");
const Event = require("./Event.js");
const intents = new Discord.Intents([
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "DIRECT_MESSAGES",
    "GUILD_VOICE_STATES",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_MESSAGE_REACTIONS",
])

const fs = require("fs");
class Client extends Discord.Client {
	constructor() {
		super({ intents, partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE"], restTimeOffset: 0})
		/**
		 * @type {Discord.Collection<string, Command>}
		 */
		this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.afk = new Discord.Collection();
	}
	start(token) {
            let slashcommands = []
            const directory = fs.readdirSync('./src/Commands')
            directory.forEach(dir => {
                const commandFiles = fs.readdirSync(`./src/Commands/${dir}`)
                .filter(file => file.endsWith('.js'))
                /**
                 * @type {Command[]}
                 */
                const commands = commandFiles.map(file => require(`./../../Commands/${dir}/${file}`));

        
                commands.forEach(command => {
                    // console.log(`✅ ${dir}/${command.name}`)
                    this.commands.set(command.name, command)
                    if (command.aliases) command.aliases.forEach(a => this.aliases.set(a, command));
                    slashcommands.push(command)
                });
            })

                const slashCommands = slashcommands
                .filter(cmd => ["BOTH", "SLASH"].includes(cmd.type))
                .map(cmd => ({
                    name: cmd.name.toLowerCase(),
                    description: cmd.description,
                    permissions: [],
                    options: cmd.slashCommandOptions,
                    defaultPermission: true
    }));
        this.removeAllListeners();

        this.on("ready", async () => {
        const cmds = await this.application.commands.set(slashCommands);
        cmds.forEach(cmd => console.log(`----- > ${cmd.name} command < -----`));
    })

    const direct = fs.readdirSync('./src/Events')
        direct.forEach(dir => {
        const commandFiles = fs.readdirSync(`./src/Events/${dir}`)
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                /**
                 * @type {Event}
                 */
                 const event = require(`../Events/${dir}/${file}`);                 
                 this.on(event.event, event.run.bind(null, this));
            });
        })
            this.login(token);
    }
    }
    module.exports = Client;