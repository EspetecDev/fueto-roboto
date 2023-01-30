module.exports = async(client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;

    if(!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ /);
    const cmd = args.shift()?.toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(cmd));
    if(command)
    {
        if(command.BOT_PERMISSIONS){
            if(message.guild.members.me.permissions.has(command.BOT_PERMISSIONS))
                return message.reply({content: `❌ **The bot has not permission to do this. Perm needed: ${command.BOT_PERMISSIONS.map(p => `\`${p}\``).join(", ")}**`})
        }

        if(command.PERMISSIONS){
            if(message.guild.member.permissions.has(command.PERMISSIONS))
                return message.reply({content: `❌ **You do not have permission to do this. Perm needed: ${command.PERMISSIONS.map(p => `\`${p}\``).join(", ")}**`})
        }

        try{
            command.execute(client, message, args, process.env.PREFIX, "/");
        } catch(e){
            message.reply({content: `❌ ** Something went wrong**`});
            console.log(e);
            return;
        }
    }
}