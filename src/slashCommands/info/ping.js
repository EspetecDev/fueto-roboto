const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("get bot ping"),

    async execute(client, interaction, prefix){
        return interaction.reply(`\`${client.ws.ping}ms\``);
    }
}