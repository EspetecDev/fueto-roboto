const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    DESCRIPTION: "Reload bot local files",
    OWNER: true,

    async execute(client, message, args, prefix){
        let optionStr = "All files";

        try {
            switch (args[0]?.toLowerCase()) {
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
            
            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields({name: `**>> Reload <<**`, value: `** ${optionStr} successfully reloaded**`})
                    .setColor(parseInt(process.env.COLOR.replace(/^#/, ''), 16))
                ]
            });
        } catch (e) {
            message.reply({content: `**Something went wrong reloading files*`});
            console.log(e);
        }
    }
}