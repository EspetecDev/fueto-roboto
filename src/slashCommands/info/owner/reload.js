const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("reload bot local files")
    .addStringOption(option => 
        option.setName("module")
        .setDescription("Module to reload")
        .addChoices(
            {name: "commands",      value:"commands"},
            {name: "slashCommands", value:"slashCommands"},
            {name: "events",        value:"events"},
            {name: "handlers",      value:"handlers"},
        )),

    async execute(client, interaction){
        let args = interaction.options.getString("module");
        let optionStr = "All files";

        try {
            switch (args?.toLowerCase()) {
                case "commands":
                    await client.loadCommands();
                    optionStr = "Commands";
                    break;
                case "slashCommands":
                    await client.loadSlashCommands();
                    optionStr = "Slashed commands";
                    break;
                case "events":
                    await client.loadEvents();
                    optionStr = "Events";
                    break;
                case "handlers":
                    await client.loadHandlers();
                    optionStr = "Handlers";
                    break;
                default:
                    await client.loadCommands();
                    await client.loadSlashCommands();
                    await client.loadEvents();
                    await client.loadHandlers();
                    break;
            }
            
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields({name: `*>> Reload <<*`, value: `* ${optionStr} successfully reloaded*`})
                    .setColor(parseInt(process.env.COLOR.replace(/^#/, ''), 16))
                ]
            })
        } catch (e) {
            interaction.reply({content: `**Something went wrong reloading files*`});
            console.log(e);
        }
    }
}