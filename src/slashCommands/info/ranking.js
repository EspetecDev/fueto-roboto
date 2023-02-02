const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("ranking de mas putos"),
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(client, interaction){
        console.log("execute ranking cmd");
        try {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xEFFF00)
                    .setThumbnail('https://assets.reedpopcdn.com/1478733648.jpg/BROK/thumbnail/120x120/quality/60/1478733648.jpg')
                    .setTitle("Ranking putasos")
                    .addFields(
                        { name: `**>> PUTASO 1 <<**`, value: `** Sabakime **` },
                        { name: `**>> PUTASO 2 <<**`, value: `** Sabakime **` },
                        { name: `**>> PUTASO 3 <<**`, value: `** Sabakime **` }
                    )
                ]
            });
        } catch (e) {
            console.log(e);
            return;
        }
        // return interaction.reply(`\`1. Sabakime\n2.Haku\n3.Bolo\``);
    }
}