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
	 * @typedef {"BOTH" | "SLASH" | "TEXT"} CommandType
	 * @typedef {{name: string, description: string, userPermissions: Discord.PermissionString, botPermissions: Discord.PermissionString, type: CommandType, slashCommandOptions: Discord.ApplicationCommandOption[], ephemeral: ephemeral run: RunFunction}} CommandOptions
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
		this.type = ["BOTH", "SLASH", "TEXT"].includes(options.type) ? options.type : "TEXT";
		this.slashCommandOptions = options.slashCommandOptions || [];
		this.ephemeral = options.ephemeral
		this.run = options.run;
	}

}
module.exports = Command;