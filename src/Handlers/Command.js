/** @format */

const Client = require("./Client.js");
const Discord = require("discord.js");


/**
 * @param {Discord.Message | Discord.CommandInteraction} message
 * @param {string[]} args
 * @param {Client} client
 */
function RunFunction(message, args, client) {}

class Command {
	/**
	 * @typedef {"Slash" | "Text"} CommandType
	 * @typedef {{name: string, description: string, userPermissions: import("discord.js").PermissionResolvable[], botPermissions: import("discord.js").PermissionResolvable[],, type: CommandType, aliases: Array[], slashCommandOptions: Discord.ApplicationCommandOption[], run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.premium = options.premium;
		this.aliases = options.aliases;
		this.owner = options.owner;
		this.cooldown = options.cooldown;
		this.userPermissions = options.userPermissions;
		this.botPermissions = options.botPermissions;
		this.type = ["Slash", "Text"].includes(options.type) ? options.type : "Text";
		this.slashCommandOptions = options.slashCommandOptions || [];
		this.nsfw = options.nsfw;
		this.guildOnly = options.guildOnly;
		this.maintance = options.maintance;
		this.dev = options.dev;
		this.run = options.run;
	}

}
module.exports = Command;