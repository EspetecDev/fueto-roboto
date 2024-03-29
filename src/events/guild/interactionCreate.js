module.exports = async(client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const command = client.slashCommands.get(interaction?.commandName);
    if(command)
    {
        if(command.OWNER){
            const owners = process.env.OWNER_IDS.split(",");
            if(!owners.includes(interaction.user.id)) 
                return interaction.reply({content: `❌ **You have to be owner to run this command**`});
        }

        if(command.BOT_PERMISSIONS){
            if(interaction.guild.members.me.permissions.has(command.BOT_PERMISSIONS))
                return interaction.reply({content: `❌ **The bot has not permission to do this. Perm needed: ${command.BOT_PERMISSIONS.map(p => `\`${p}\``).join(", ")}**`})
        }

        if(command.PERMISSIONS){
            if(interaction.guild.member.permissions.has(command.PERMISSIONS))
                return interaction.reply({content: `❌ **You do not have permission to do this. Perm needed: ${command.PERMISSIONS.map(p => `\`${p}\``).join(", ")}**`})
        }

        try{
            command.execute(client, interaction, "/");
        } catch(e){
            interaction.reply({content: `❌ ** Something went wrong**`});
            console.log(e);
            return;
        }
    }
}