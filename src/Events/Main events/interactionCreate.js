const Event = require("../../Handlers/Event.js");

module.exports = new Event("interactionCreate", async(client, interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured O><O", ephemeral: true});
        await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => {});
        const args = [];
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value)}
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        if (!interaction.member.permissions.has(cmd.userPermissions || []))
            return interaction.followUp({ content: `*Baakaa* you dont have the permission: \`${command.permission}\` to run this command...`, ephemeral: true });
        cmd.run(interaction, args, client)}
    if (interaction.isContextMenu()) {
        const command = client.commands.get(interaction.commandName);
         interaction.deferReply({ ephemeral: command.ephemeral ? command.ephemeral : false })
                 if (command) command.run(interaction, args, client)}})